import { TETabs, TETabsItem } from "tw-elements-react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import GuestsTable from "./components/GuestsTable";

const guests = [
  {
    checkIn: "yes",
    name: "Joshua",
    credentials: "Agent",
    lastUpdated: "24 Nov 2022, 4:45 PM",
  },
];

const Guests = () => {
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
            <h2 className="text-3xl">Guests Management</h2>
          </div>

          <div className="flex gap-3">
            <button
              className="text-white bg-secondary-600 hover:bg-secondary-500 animation-fade rounded px-2 py-2"
              type="button"
            >
              Upload Guests
            </button>

            <button
              className="text-white bg-primary-colour bg-primary-colour-hover animation-fade rounded px-2 py-2"
              type="button"
              onClick={() => navigate("/create-guest")}
            >
              Create Guests
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
                  Current
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
        <GuestsTable
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
    </section>
  );
};

export default Guests;
