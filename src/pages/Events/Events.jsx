import { FaMagnifyingGlass } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import CardEvent from "./components/CardEvent";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from "tw-elements-react";
import axios from "axios";

const Events = () => {
  const [basicActive, setBasicActive] = useState("tab1");
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

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };

  const currentEvent = () => {
    handleBasicClick("tab1");
  };

  const pastEvent = () => {
    handleBasicClick("tab2");
  };

  if (isPending) {
    return <p>Loading...</p>;
  }

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
                onClick={currentEvent}
                active={basicActive === "tab1"}
                className="tag-link relative"
              >
                Current{" "}
                <div className="rounded-full px-[.3rem] py-[.1rem] flex justify-center items-center bg-tertiary-colour text-white absolute top-1 right-1">
                  <h4 className="text-[.63rem]">{data?.data?.current?.length}</h4>
                </div>
              </TETabsItem>
              <TETabsItem
                onClick={pastEvent}
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
            <FaMagnifyingGlass className="absolute top-2 left-3 text-secondary-colour size-6" />
          </div>
        </div>
      </div>

      <TETabsContent>
        <TETabsPane show={basicActive === "tab1"}>
          {data?.data?.current?.length < 1 ? (
            <div>
              <h2>There's no current events for the moment...</h2>
            </div>
          ) : (
            data?.data?.current.map((event) => {
              return <CardEvent key={event?.id} {...event} />;
            })
          )}
        </TETabsPane>

        <TETabsPane show={basicActive === "tab2"}>
          {data?.data?.past?.length < 1 ? (
            <div>
              <h2>There's no past events for the moment...</h2>
            </div>
          ) : (
            data?.data?.current.map((event) => {
              return <CardEvent key={event?.id} {...event} />;
            })
          )}
        </TETabsPane>
      </TETabsContent>
    </section>
  );
};

export default Events;
