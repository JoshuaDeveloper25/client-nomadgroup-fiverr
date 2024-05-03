import { Link } from "react-router-dom";

const CardEvent = ({
  id,
  eventName,
  venue,
  venueCapacity,
  eventNotes,
  eventDate,
  event,
  total,
  remainingGuests
}) => {

  return (
    <Link to={`/event-details/?id=${id}`}>
      <article className="shadow-lg p-5 w-full rounded-md cursor-pointer">
        <div className="flex justify-between">
          <h3 className="font-bold text-xl">{eventName}</h3>

          <h4 className="text-secondary-colour font-semibold">{eventDate}</h4>
        </div>

        <div className="mt-2">
          <h4 className="text-secondary-colour text-sm">
            Cool event details: {eventNotes}
          </h4>
          <h4 className="text-secondary-colour text-sm">Venue Name: {venue}</h4>
          <h4 className="text-secondary-colour text-sm">Artists, Etc:</h4>
        </div>

        <div className="flex gap-3 items-center my-3">
          <progress max={venueCapacity} value={total}></progress>

          <div className="flex-[20%]">
            <h3 className="text-sm text-black/70">
              {total || 0}/{venueCapacity}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <h3 className="bg-secondary-color/15 text-sm px-2 border border-tertiary-color text-tertiary-colour rounded-2xl">
            Coming Up!
          </h3>

          <h3 className="bg-secondary-color/15 text-sm px-2 border border-secondary-color rounded-2xl">
            {`#EE234`}
          </h3>
        </div>
      </article>
    </Link>
  );
};

export default CardEvent;
