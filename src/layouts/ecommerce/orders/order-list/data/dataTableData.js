/* eslint-disable react/prop-types */
// ProductsList page components
import IdCell from "layouts/ecommerce/orders/order-list/components/IdCell";
import DefaultCell from "layouts/ecommerce/orders/order-list/components/DefaultCell";
import StatusCell from "layouts/ecommerce/orders/order-list/components/StatusCell";
import CustomerCell from "layouts/ecommerce/orders/order-list/components/CustomerCell";

// Images
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import team5 from "assets/images/team-5.jpg";
import ivana from "assets/images/ivana-squares.jpg";
import React from "react";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const handleStatusChange = (value) => {
  console.log("Button clicked for revenue: ", value);
  // Add further actions here
};

const dataTableData = {
  columns: [
    { Header: "sn", accessor: "sn" /* , Cell: ({ value }) => <IdCell id={value} /> */ },
    {
      Header: "date",
      accessor: "date",
      // Cell: ({ value }) => <DefaultCell value={value} />,
    },
    {
      Header: "status",
      accessor: "status",
      Cell: ({ value }) => {
        let status;

        if (value === "paid") {
          status = <StatusCell icon="done" color="success" status="Paid" />;
        } else if (value === "refunded") {
          status = <StatusCell icon="replay" color="dark" status="Refunded" />;
        } else {
          status = <StatusCell icon="close" color="error" status="Canceled" />;
        }

        return status;
      },
    },
    {
      Header: "customer",
      accessor: "customer",
      Cell: ({ value: [name, data] }) => (
        <CustomerCell image={data.image} color={data.color || "dark"} name={name} />
      ),
    },
    {
      Header: "action",
      accessor: "action",
      Cell: ({ value }) => {
        const [status, setStatus] = React.useState("Pending");

        const handleStatusChange = (event) => {
          setStatus(event.target.value);
          console.log(`Action selected for action ${value}: `, event.target.value);
        };

        return (
          <div>
            <span>{value}</span>
            <FormControl variant="outlined" style={{ minWidth: 120 }}>
              {/* <InputLabel>Status</InputLabel> */}
              <Select value={status} onChange={handleStatusChange} label="Status">
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </div>
        );
      },
    },
  ],

  rows: [
    {
      sn: "1",
      date: "1 Nov, 10:20 AM",
      status: "paid",
      customer: ["Orlando Imit", { image: team2 }],
      action: "",
    },
    {
      sn: "2",
      date: "1 Nov, 10:53 AM",
      status: "paid",
      customer: ["Alice Murinho", { image: team1 }],
      action: "",
    },
    {
      sn: "3",
      date: "1 Nov, 11:13 AM",
      status: "refunded",
      customer: ["Michael Mirra", { image: "M" }],
      action: "",
    },
    {
      sn: "4",
      date: "1 Nov, 12:20 PM",
      status: "paid",
      customer: ["Andrew Nichel", { image: team3 }],
      action: "",
    },
    {
      sn: "5",
      date: "1 Nov, 1:40 PM",
      status: "canceled",
      customer: ["Sebastian Koga", { image: team4 }],
      action: "",
    },
    {
      sn: "6",
      date: "1 Nov, 2:19 PM",
      status: "paid",
      customer: ["Laur Gilbert", { image: "L" }],
      action: "",
    },
    {
      sn: "7",
      date: "1 Nov, 3:42 AM",
      status: "paid",
      customer: ["Iryna Innda", { image: "I" }],
      action: "",
    },
    {
      sn: "8",
      date: "2 Nov, 9:32 AM",
      status: "paid",
      customer: ["Arrias Liunda", { image: "A" }],
      action: "",
    },
    {
      sn: "9",
      date: "2 Nov, 10:14 AM",
      status: "paid",
      customer: ["Rugna Ilpio", { image: team5 }],
      action: "",
    },
    {
      sn: "10",
      date: "2 Nov, 10:14 AM",
      status: "refunded",
      customer: ["Anna Landa", { image: ivana }],
      action: "",
    },
    {
      sn: "11",
      date: "2 Nov, 3:12 PM",
      status: "paid",
      customer: ["Karl Innas", { image: "K" }],
      action: "",
    },
    {
      sn: "12",
      date: "2 Nov, 5:12 PM",
      status: "paid",
      customer: ["Oana Kilas", { image: "O", color: "info" }],
      action: "",
    },
  ],
};

export default dataTableData;

// columns: [
//   { name: "sn", align: "left" },
//   { name: "name", align: "left" },
//   { name: "status", align: "left" },
//   { name: "email", align: "center" },
//   { name: "employed", align: "center" },
//   { name: "id", align: "center" },
//   { name: "", align: "center" },
// ],

// rows: [
//   {
//     sn: "01",
//     name: [team2, "John Micheal"],
//     status: "Pending",
//     email: "john@user.com",
//     employed: "23/04/18",
//     id: "43431",
//   },
//   {
//     sn: "02",
//     name: [team3, "Alexa Liras"],
//     status: "Fulfilled",
//     email: "alexa@user.com",
//     employed: "11/01/19",
//     id: "93021",
//   },
//   {
//     sn: "03",
//     name: [team1, "Laurent Perrier"],
//     status: "Pending",
//     email: "laurent@user.com",
//     employed: "19/09/17",
//     id: "10392",
//   },
//   {
//     sn: "04",
//     name: [team3, "Michael Levi"],
//     status: "Pending",
//     email: "michael@user.com",
//     employed: "24/12/08",
//     id: "34002",
//   },
//   {
//     sn: "05",
//     name: [team2, "Richard Gran"],
//     status: "Pending",
//     email: "richard@user.com",
//     employed: "04/10/21",
//     id: "91879",
//   },
//   {
//     sn: "06",
//     name: [team3, "Miriam Eric"],
//     status: "Rejected",
//     email: "miriam@user.com",
//     employed: "14/09/20",
//     id: "23042",
//   },
// ],
