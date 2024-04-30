import { PiNotePencil } from "react-icons/pi";
import { Table } from "../../../components/Table";
import { Link } from "react-router-dom";

const GuestsTable = ({ guests, setFiltering, filtering }) => {
  return (
    <Table
      data={guests}
      setFiltering={setFiltering}
      filtering={filtering}
      columns={[
        {
          Header: `Check In`,
          accessorKey: "checkIn",
        },

        {
          header: "Name",
          accessorKey: "name",
        },

        {
          header: "Credentials",
          accessorKey: "credentials",
        },

        {
          header: "Last updated",
          accessorKey: "lastUpdated",
        },

        {
          header: "Acción",

          cell: (info) => {
            const value = info.cell.row.original;
            console.log(value);

            return (
              <>
                <Link
                  to={`/perfil/${value._id}`}
                  className="bg-red-500 me-2 text-white px-3 py-2 rounded font-bold text-nowrap"
                >
                  Delete
                </Link>

                <Link
                  to={`/perfil/${value._id}`}
                  className="bg-blue-600 text-white px-3 py-2 rounded font-bold text-nowrap"
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
