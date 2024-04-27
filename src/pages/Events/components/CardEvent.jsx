const CardEvent = ({
  id,
  eventTitle,
  venueName,
  artists,
  numberPeople,
  eventDate,
  ticket,
  eventDetails,
}) => {
  return (
    <article className="shadow-lg p-5 w-full rounded-md">
      <div className="flex justify-between">
        <h3 className="font-bold text-xl">{eventTitle}</h3>

        <h4 className="text-secondary-colour font-semibold">{eventDate}</h4>
      </div>

      <div className="mt-2">
        <h4 className="text-secondary-colour text-sm">
          Cool event details: {eventDetails}
        </h4>
        <h4 className="text-secondary-colour text-sm">
          Venue Name: {venueName}
        </h4>
        <h4 className="text-secondary-colour text-sm">
          Artists, Etc: {artists}
        </h4>
      </div>

      <div className="flex gap-3 items-center my-3">
        <div className="w-full h-[1.1rem] flex-1 border border-black">
          <div className="w-full h-4 bg-gray-200 dark:bg-gray-700">
            <div className="bg-primary-colour max-w-[30%] h-4"></div>
          </div>
        </div>

        <div className="flex-[20%]">
          <h3 className="text-sm text-black/70">{numberPeople}/400</h3>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <h3 className="bg-secondary-color/15 text-sm px-2 border border-tertiary-color text-tertiary-colour rounded-2xl">
          Coming Up!
        </h3>

        <h3 className="bg-secondary-color/15 text-sm px-2 border border-secondary-color rounded-2xl">
          {ticket}
        </h3>
      </div>
    </article>
  );
};

export default CardEvent;
