import EventDetailsCheckIn from "./EventDetailsCheckIn";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { RiContactsBook3Line } from "react-icons/ri";
import { Table } from "../../../components/Table";
import { PiNotePencil } from "react-icons/pi";
import { PiUserList } from "react-icons/pi";
import { TfiTime } from "react-icons/tfi";

const EventDetailsTable = ({ guests = [], setFiltering, filtering }) => {
  return (
    <Table
      data={guests}
      setFiltering={setFiltering}
      filtering={filtering}
      columns={[
        {
          id: "checkIn",
          accessorKey: "checkIn",
          header: () => (
            <div className="flex items-center gap-2">
              <PiNotePencil className="size-6" />
              <h3 className="text-sm font-semibold">Check In</h3>
            </div>
          ),
          cell: (row) => <EventDetailsCheckIn row={row?.cell?.row?.original} />,
        },

        {
          id: "guestName",
          accessorKey: "guestName",
          header: () => (
            <div className="flex items-center gap-2">
              <RiContactsBook3Line className="size-6" />
              <h3 className="text-sm font-semibold">Name</h3>
            </div>
          ),
          cell: (row) => {
            return (
              <div>
                <h3 className="text-sm">
                  {row?.cell?.row?.original?.guestName}
                </h3>

                <h3 className="text-xs text-secondary-600">
                  {row?.cell?.row?.original?.guestEmail}
                </h3>
              </div>
            );
          },
        },

        {
          id: "guestCredential",
          accessorKey: "guestCredential",
          header: () => (
            <div className="flex items-center gap-2">
              <PiUserList className="size-6" />
              <h3 className="text-sm font-semibold">Credentials</h3>
            </div>
          ),
          cell: (row) => {
            return (
              <div className="border border-fourth-colour text-fourth-colour inline-block rounded-full px-2">
                <h3 className="text-sm">
                  {row?.cell?.row?.original?.guestCredential}
                </h3>
              </div>
            );
          },
        },

        {
          id: "partySize",
          accessorKey: "partySize",
          header: () => (
            <div className="flex items-center gap-2">
              <FaArrowsDownToPeople className="size-6" />
              <h3 className="text-sm font-semibold">Party Size</h3>
            </div>
          ),
          cell: (row) => {
            return (
              <h3 className="text-md font-bold text-center">
                {row?.cell?.row?.original?.partySize}
              </h3>
            );
          },
        },

        {
          id: "lastUpdated",
          accessorKey: "lastUpdated",
          header: () => (
            <div className="flex items-center gap-2">
              <TfiTime className="size-6" />
              <h3 className="text-sm font-semibold">Last updated</h3>
            </div>
          ),
        },
      ]}
    />
  );
};

export default EventDetailsTable;
