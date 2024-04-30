import { TETabs, TETabsItem } from "tw-elements-react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EventDetailsTable from "./components/EventDetailsTable";

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
  const navigate = useNavigate();

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };

  const currentEvent = () => {
    handleBasicClick("tab1");
  };

  return (
    <section className="flex max-[960px]:flex-col min-[960px]:flex-row">
      <article className="flex-[50%] lg:w-auto w-full min-[960px]:border-e-2 border-b-2 h-svh container-page md:ps-1 ps-2 md:pe-10 pe-2">
        <div className="flex flex-col sm:flex-row justify-between sm:gap-6 gap-2 md:mt-3 mt-14">
          <div>
            <h2 className="text-3xl">Cool Event Name</h2>
          </div>

          <div className="flex gap-3">
            <button
              className="text-white bg-primary-colour bg-primary-colour-hover animation-fade rounded px-2 py-2"
              type="button"
              onClick={() => navigate('/create-guest')}
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
                  <div className="h-4 w-4 rounded-full flex justify-center items-center bg-tertiary-colour text-white absolute top-4 right-1">
                    <h4 className="text-[.7rem]">1</h4>
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

      <article className="flex-1 lg:w-auto w-full container-page p-3">
        <div className="shadow-lg p-3 w-full rounded-md">
          <div className="flex justify-between gap-2 items-center">
            <h3 className="font-bold text-md">Old Cool Event Name</h3>

            <h4 className="text-secondary-colour font-semibold text-xs">
              20th Oct
            </h4>
          </div>

          <div className="mt-2">
            <h4 className="text-secondary-colour text-sm">
              Cool event details:
            </h4>
            <h4 className="text-secondary-colour text-sm">Venue Name:</h4>
            <h4 className="text-secondary-colour text-sm">Artists, Etc:</h4>
          </div>

          <div className="flex items-center gap-4 mt-3">
            <h3 className="bg-secondary-color/15 text-sm px-2 border border-tertiary-color text-tertiary-colour rounded-2xl">
              Coming Up!
            </h3>

            <h3 className="bg-secondary-color/15 text-sm px-2 border border-secondary-color rounded-2xl">
              {`#EE234`}
            </h3>
          </div>
        </div>
      </article>
    </section>
  );
};

export default EventDetails;
