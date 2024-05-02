import { PiNotePencil, PiUserList } from "react-icons/pi";
import { Table } from "../../../components/Table";
import { Link } from "react-router-dom";
import { RiContactsBook3Line } from "react-icons/ri";
import { GoChecklist } from "react-icons/go";
import { TfiTime } from "react-icons/tfi";

const GuestsTable = ({ guests, setFiltering, filtering }) => {
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
              <RiContactsBook3Line className="size-6" />
              <h3 className="text-sm font-semibold">Name</h3>
            </div>
          ),
          accessorKey: "name",
        },

        {
          id: "col2",
          accessorKey: "credentials",
          header: () => (
            <div className="flex items-center gap-2">
              <PiUserList className="size-6" />
              <h3 className="text-sm font-semibold">Credentials</h3>
            </div>
          ),
        },

        {
          id: "col3",
          header: () => (
            <div className="flex items-center gap-2">
              <TfiTime className="size-6" />
              <h3 className="text-sm font-semibold">Last updated</h3>
            </div>
          ),
          accessorKey: "lastUpdated",
        },

        {
          id: "col4",
          header: () => (
            <div className="flex items-center gap-2">
              <GoChecklist className="size-6" />
              <h3 className="text-sm font-semibold">Actions</h3>
            </div>
          ),
          cell: (info) => {
            const value = info.cell.row.original;
            console.log(value);

            return (
              <>
                <Link
                  to={`/perfil/${value._id}`}
                  className="bg-red-500 me-2 text-white px-3 py-2 rounded font-bold hover:bg-red-700 animation-fade text-nowrap"
                >
                  Delete
                </Link>

                <Link
                  to={`/perfil/${value._id}`}
                  className="bg-blue-500 text-white px-3 py-2 rounded font-bold hover:bg-blue-700 animation-fade text-nowrap"
                >
                  Edit
                </Link>
              </>
            );
          },
        },
      ]}
    />
  );
};

export default GuestsTable;
