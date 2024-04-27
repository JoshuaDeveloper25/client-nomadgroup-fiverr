import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import CardEvent from "./components/CardEvent";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from "tw-elements-react";

const events = [
  {
    id: 1,
    eventTitle: "Cool Event Name",
    venueName: "Party",
    eventDetails: "Friendly, Foodless, Funny",
    artists: "John Doe, Jane Doe",
    numberPeople: 100,
    eventDate: "20th Oct",
    ticket: "#EE234",
    eventTime: "Current",
  },

  {
    id: 2,
    eventTitle: "Cool Event Name",
    venueName: "Party",
    eventDetails: "Friendly, Foodless, Funny",
    artists: "John Doe, Jane Doe",
    numberPeople: 100,
    eventDate: "20th Oct",
    ticket: "#EE234",
    eventTime: "Past",
  },

  {
    id: 3,
    eventTitle: "Cool Event Name",
    venueName: "Party",
    eventDetails: "Friendly, Foodless, Funny",
    artists: "John Doe, Jane Doe",
    numberPeople: 100,
    eventDate: "20th Oct",
    ticket: "#EE234",
    eventTime: "Current",
  },

  {
    id: 4,
    eventTitle: "Cool Event Name",
    venueName: "Party",
    artists: "John Doe, Jane Doe",
    numberPeople: 100,
    eventDate: "20th Oct",
    ticket: "#EE234",
    eventTime: "Past",
  },
];

const Events = () => {
  const [basicActive, setBasicActive] = useState("tab1");
  const navigate = useNavigate();

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };

  return (
    <section className="container-page md:ps-1 ps-2 md:pe-10 pe-2">
      <div className="flex justify-between md:mt-3 mt-14">
        <div>
          <h2 className="text-3xl">Events</h2>
        </div>

        <div>
          <button
            onClick={() => navigate(`/create-event`)}
            className="text-white bg-primary-colour bg-primary-colour-hover animation-fade rounded px-2 py-2"
            type="button"
          >
            Create Event
          </button>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between sm:items-start items-center mt-5">
        <div className="flex-1">
          <div className="mb-3">
            <TETabs className="tetabs">
              <TETabsItem
                onClick={() => handleBasicClick("tab1")}
                active={basicActive === "tab1"}
                className="tag-link relative"
              >
                Current{" "}
                <div className="h-4 w-4 rounded-full flex justify-center items-center bg-tertiary-color text-white absolute top-4 right-1">
                  <h4 className="text-[.7rem]">1</h4>
                </div>
              </TETabsItem>
              <TETabsItem
                onClick={() => handleBasicClick("tab2")}
                active={basicActive === "tab2"}
                className="tag-link"
              >
                Past
              </TETabsItem>
            </TETabs>
          </div>
        </div>

        <div className="flex-1 flex items-end justify-end">
          <div className="relative sm:max-w-52 max-w-full">
            <input
              className=" outline-primary-color border py-2 px-10 w-full rounded"
              placeholder="Search events"
              type="text"
            />
            <HiMiniMagnifyingGlass className="absolute top-2 left-3 text-secondary-colour size-6" />
          </div>
        </div>
      </div>

      <TETabsContent>
        <TETabsPane show={basicActive === "tab1"}>
          {events.map((event) => {
            return <CardEvent key={event?.id} {...event} />;
          })}
        </TETabsPane>
        <TETabsPane show={basicActive === "tab2"}>
          {events.map((event) => {
            return <CardEvent key={event?.id} {...event} />;
          })}
        </TETabsPane>
      </TETabsContent>
    </section>
  );
};

export default Events;
