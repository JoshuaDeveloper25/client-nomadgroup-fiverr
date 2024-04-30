import { PiNotePencil } from "react-icons/pi";
import { Table } from "../../../components/Table";

const EventDetailsTable = ({ guests, setFiltering, filtering }) => {
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
      ]}
    />
  );
};

export default EventDetailsTable;
