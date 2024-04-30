import { RiContactsBook3Line } from "react-icons/ri";
import { Table } from "../../../components/Table";
import { PiNotePencil } from "react-icons/pi";
import { PiUserList } from "react-icons/pi";
import { TfiTime } from "react-icons/tfi";

const EventDetailsTable = ({ guests, setFiltering, filtering }) => {
  return (
    <Table
      data={guests}
      setFiltering={setFiltering}
      filtering={filtering}
      columns={[
        {
          id: "col1",
          header: () => (
            <div className="flex items-center gap-2">
              <PiNotePencil className="size-6" />
              <h3 className="text-sm font-semibold">Check In</h3>
            </div>
          ),
          cell: (row) => (
            <div className="inline-flex items-center">
              <label
                className="relative flex items-center rounded-full cursor-pointer"
                htmlFor="customStyle"
              >
                <input
                  type="checkbox"
                  className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-full border border-gray-900/20 bg-gray-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                  id="customStyle"
                />
                <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
            </div>
          ),
        },

        {
          id: "col2",
          header: () => (
            <div className="flex items-center gap-2">
              <RiContactsBook3Line className="size-6" />
              <h3 className="text-sm font-semibold">Name</h3>
            </div>
          ),
          accessorKey: "name",
        },

        {
          id: "col3",
          header: () => (
            <div className="flex items-center gap-2">
              <PiUserList className="size-6" />
              <h3 className="text-sm font-semibold">Credentials</h3>
            </div>
          ),
          cell: (row) => {
            return (
              <div className="border border-fourth-colour text-fourth-colour inline-block rounded-full px-2">
                <h3 className="text-sm">Agent</h3>
              </div>
            );
          },
        },

        {
          id: "col4",
          header: () => (
            <div className="flex items-center gap-2">
              <TfiTime className="size-6" />
              <h3 className="text-sm font-semibold">Last updated</h3>
            </div>
          ),
          accessorKey: "lastUpdated",
        },
      ]}
    />
  );
};

export default EventDetailsTable;
