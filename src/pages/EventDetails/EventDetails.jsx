import { useNavigate, useSearchParams } from "react-router-dom";
import EventDetailsTable from "./components/EventDetailsTable";
import { TETabs, TETabsItem } from "tw-elements-react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import axios from "axios";

const guests = [
  {
    checkIn: "yes",
    name: "Joshua",
    credentials: "Agent",
    lastUpdated: "24 Nov 2022, 4:45 PM",
  },
];

const EventDetails = () => {
  const [basicActive, setBasicActive] = useState("tab1");
  const [filtering, setFiltering] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { data, isPending, error } = useQuery({
    queryKey: ["event-details", +searchParams.get("id")],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/events/get-event/${+searchParams.get(
          "id"
        )}`
      ),
  });

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };

  const currentEvent = () => {
    handleBasicClick("tab1");
  };

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <section className="flex max-[960px]:flex-col min-[960px]:flex-row">
      <article className="flex-[50%] lg:w-auto w-full min-[960px]:border-e-2 max-[960px]:border-b-2 h-svh container-page md:ps-1 ps-2 md:pe-10 pe-2">
        <div className="flex flex-col sm:flex-row justify-between sm:gap-6 gap-2 md:mt-3 mt-14">
          <div>
            <h2 className="text-3xl">{data?.data?.eventName}</h2>
          </div>

          <div className="flex gap-3">
            <button
              className="text-white bg-primary-colour bg-primary-colour-hover animation-fade rounded px-2 py-2"
              type="button"
              onClick={() => navigate("/create-guest")}
            >
              Create Guests
            </button>

            <button
              className="text-white bg-secondary-600 hover:bg-secondary-500 animation-fade rounded px-2 py-2"
              type="button"
            >
              Upload Guests
            </button>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-between sm:items-start items-center mt-5">
          <div className="flex-1">
            <div className="mb-3">
              <TETabs className="tetabs">
                <TETabsItem
                  onClick={currentEvent}
                  active={basicActive === "tab1"}
                  className="tag-link relative"
                >
                  Current{" "}
                  <div className="rounded-full px-[.3rem] py-[.1rem] flex justify-center items-center bg-tertiary-colour text-white absolute top-1 right-1">
                    <h4 className="text-[.63rem]">1</h4>
                  </div>
                </TETabsItem>
              </TETabs>
            </div>
          </div>

          <div className="flex-1 flex items-end justify-end">
            <div className="relative sm:max-w-52 max-w-full">
              <input
                className=" outline-primary-color border py-2 px-10 w-full rounded"
                placeholder="Search events"
                onChange={(e) => setFiltering(e.target.value)}
                value={filtering}
                type="text"
              />
              <FaMagnifyingGlass className="absolute top-2 left-3 text-secondary-colour size-6" />
            </div>
          </div>
        </div>

        {/* Table */}
        <EventDetailsTable
          guests={guests}
          setFiltering={setFiltering}
          filtering={filtering}
        />

        <div className="text-end my-4">
          <button
            onClick={() => navigate(`/events`)}
            className="text-white bg-secondary-600 hover:bg-secondary-500 animation-fade rounded px-2 py-2"
            type="button"
          >
            Back
          </button>
        </div>
      </article>

      <article className="flex-1 space-y-2 lg:w-auto w-full container-page p-3 overflow-y-scroll h-svh">
        <ShortcutsEvents />
      </article>
    </section>
  );
};

export default EventDetails;

// --> Shortcut Events
const ShortcutsEvents = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; // months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  const newDate = year + "-" + month + "-" + day;

  const { data, isPending, error } = useQuery({
    queryKey: ["eventsCards"],
    queryFn: async () =>
      await axios.get(`${import.meta.env.VITE_BASE_URL}/events/${newDate}`),
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  return data?.data?.current?.map((currentEvent) => (
    <div
      onClick={() => navigate(`/event-details?id=${currentEvent?.id}`)}
      key={currentEvent?.id}
      className={`${
        +searchParams.get("id") === currentEvent?.id
          ? "bg-primary-colour text-white"
          : null
      } shadow-lg p-3 w-full text-secondary-colour rounded-md cursor-pointer animation-fade`}
    >
      <div className="flex justify-between gap-2 items-center">
        <h3 className="font-bold text-md">{currentEvent?.eventName}</h3>

        <h4 className="font-semibold text-xs">{currentEvent?.eventDate}</h4>
      </div>

      <div className="mt-2">
        <h4 className="text-sm">Cool event details:</h4>
        <h4 className="text-sm">Venue Name: {currentEvent?.venue}</h4>
        <h4 className="text-sm">Artists, Etc:</h4>
      </div>

      <div className="flex items-center gap-4 mt-3">
        <h3
          className={`${
            +searchParams.get("id") === currentEvent?.id ? "text-white" : null
          } bg-secondary-color/15 text-sm px-2 border border-tertiary-color text-tertiary-colour rounded-2xl`}
        >
          Coming Up!
        </h3>

        <h3 className="bg-secondary-color/15 text-sm px-2 border border-secondary-color rounded-2xl">
          {`#EE234`}
        </h3>
      </div>
    </div>
  ));
};
