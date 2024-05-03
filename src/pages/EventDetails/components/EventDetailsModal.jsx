import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const EventDetailsModal = ({ remainingGuest, guests, setModalStatus }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const emailRef = useRef();

  const { mutate, data, error, isPending } = useMutation({
    mutationFn: (userInfo) => {
      return axios.get(
        `${import.meta.env.VITE_BASE_URL}/guests/get-guest/${
          userInfo?.guestEmail
        }`
      );
    },
    onSuccess: (res) => {
      // toast.success("Successfully Verified!");
    },
    onError: (err) => {
      toast.info(`Guest not found, create it!`);
      navigate(`/create-guest/?id=${+searchParams.get("id")}`, {
        state: {
          email: emailRef?.current?.value,
          remainingGuest: remainingGuest,
        },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const userInfo = {
      guestEmail: e?.target?.guestEmail?.value.trim(),
    };

    if ([userInfo?.guestEmail].includes("")) {
      return toast.error(`Fill up the blanks available!`);
    }

    mutate({
      guestEmail: userInfo?.guestEmail,
    });
  };

  return (
    <section
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden bg-black/60 fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full"
    >
      <div className="relative p-4 w-full mt-16 mx-auto max-w-md max-h-full">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* <!-- Modal header --> */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Verify Guests
            </h3>
            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
              onClick={() => setModalStatus((prev) => !prev)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* <!-- Modal body --> */}
          <div className="p-4 md:p-5">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="guestEmail"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="guestEmail"
                  ref={emailRef}
                  id="guestEmail"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="email@gmail.com"
                />
                <button
                  disabled={isPending}
                  type="submit"
                  className="w-full mt-2 text-white bg-primary-colour bg-primary-colour-hover animation-fade py-2 rounded"
                >
                  Search for Guest
                </button>
                {!!data?.data && (
                  <GuestFound
                    remainingGuest={remainingGuest}
                    emailRef={emailRef}
                    guests={guests}
                    dataUser={data?.data}
                    setModalStatus={setModalStatus}
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetailsModal;

const GuestFound = ({
  remainingGuest,
  emailRef,
  guests,
  dataUser,
  setModalStatus,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [partySize, setPartySize] = useState(1);
  const [arrivalTime, setArrivalTime] = useState(0);
  const queryClient = useQueryClient();

  const { mutate, data, error, isPending } = useMutation({
    mutationFn: (userInfo) => {
      return axios.post(
        `${import.meta.env.VITE_BASE_URL}/guests/add-guest/${+searchParams.get(
          "id"
        )}/${dataUser?.id}`,
        userInfo
      );
    },
    onSuccess: (res) => {
      // toast.success("Successfully Verified!");
      queryClient.invalidateQueries({
        queryKey: ["event-details", +searchParams.get("id")],
      });
      setModalStatus((prev) => !prev);
    },
    onError: (err) => {
      toast.error(getFastApiErrors(err));
      console.log(err);
    },
  });

  const handleSubmit = () => {
    const guestExisted = guests?.find((guest) =>
      guest?.guestEmail === emailRef?.current?.value ? guest?.guestEmail : null
    );

    const totalGuest = partySize;

    if (totalGuest > remainingGuest) {
      return toast.error("Exceed the limit of guests!");
    }

    if (guestExisted) {
      return alert(`There already a guest with that credential!`);
    }

    mutate({
      partySize: partySize || 1,
      arrivalTime: arrivalTime,
    });
  };

  return (
    <div>
      <p className="font-bold border border-green-600 text-green-600 text-center py-2 my-3 rounded-sm">
        Guest Found!
      </p>

      <div className="text-center leading-[.6rem] border border-gray-600 p-2 rounded">
        <p className="text-gray-600 text-sm">Name: {dataUser?.guestName}</p>
        <p className="text-gray-600 text-sm">Email: {dataUser?.guestEmail}</p>
        <p className="text-gray-600 text-sm">Phone: {dataUser?.guestPhone}</p>
        <p className="text-gray-600 text-sm">
          Credential: {dataUser?.guestCredential}
        </p>
      </div>

      <label
        htmlFor="partySize"
        className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Party size
      </label>
      <input
        type="number"
        name="partySize"
        id="partySize"
        value={partySize}
        onChange={(e) => setPartySize(e?.target?.value)}
        className="bg-gray-50 mb-3 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        placeholder="1"
        min={1}
        required
      />

      <label
        htmlFor="arrivalTime"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Arrival Time
      </label>
      <input
        type="time"
        name="arrivalTime"
        id="arrivalTime"
        value={arrivalTime}
        onChange={(e) => setArrivalTime(e?.target?.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        required
      />

      <button
        disabled={isPending}
        onClick={handleSubmit}
        type="button"
        className="w-full mt-3 text-white bg-primary-colour bg-primary-colour-hover animation-fade py-2 rounded"
      >
        Send
      </button>
    </div>
  );
};
