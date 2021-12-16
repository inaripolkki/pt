import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import Button from "@mui/material/Button";
import { Snackbar } from "@mui/material";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import { CSVLink } from "react-csv";

function Customerlist() {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };

  const addTraining = (url) => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(url),
    })
      .then((response) => {
        if (response.ok) {
          fetchCustomers();
          setOpen(true);
          setMsg("training added succesfully");
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (url) => {
    console.log(url);
    if (window.confirm("Are you sure?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            fetchCustomers();
            setOpen(true);
            setMsg("Deleted succesfully");
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const addCustomer = (customer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.ok) {
          fetchCustomers();
          setOpen(true);
          setMsg("Customer added succesfully");
        } else {
          alert("Something went wrong when adding");
        }
      })
      .catch((err) => console.error(err));
  };

  const updateCustomer = (url, updatedCustomer) => {
    fetch(url, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updatedCustomer),
    })
      .then((response) => {
        if (response.ok) {
          fetchCustomers();
          setOpen(true);
          setMsg("Customer edited succesfully");
        } else {
          alert("Edit failed");
        }
      })
      .catch((err) => console.error(err));
  };

  const columns = [
    { field: "firstname", sortable: true, filter: true, width: 140 },
    { field: "lastname", sortable: true, filter: true, width: 140 },
    { field: "email", sortable: true, filter: true, width: 180 },
    { field: "phone", sortable: true, filter: true, width: 140 },
    { field: "streetaddress", sortable: true, filter: true, width: 180 },
    { field: "postcode", sortable: true, filter: true, width: 140 },
    { field: "city", sortable: true, filter: true, width: 140 },
    {
      headerName: "",
      field: "links.0.href",
      width: 160,
      cellRendererFramework: (params) => (
        <AddTraining addTraining={addTraining} params={params} />
      ),
    },
    {
      headerName: "",
      field: "links.0.href",
      width: 120,
      cellRendererFramework: (params) => (
        <EditCustomer updateCustomer={updateCustomer} params={params} />
      ),
    },
    {
      headerName: "",
      field: "links.0.href",
      width: 120,
      cellRendererFramework: (params) => (
        <Button size="small" onClick={() => deleteCustomer(params.value)}>
          Delete
        </Button>
      ),
    },
  ];

  const headers = [
    { label: "Firstname", key: "firstname" },
    { label: "Lasttname", key: "lastname" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Streetaddress", key: "streetaddress" },
    { label: "Postcode", key: "postcode" },
    { label: "city", key: "city" },
  ];

  const csvReport = {
    filename: "Report.csv",
    headers: headers,
    data: customers,
  };
  return (
    <React.Fragment>
      <CSVLink {...csvReport}>Export to CSV</CSVLink>
      <AddCustomer addCustomer={addCustomer} />
      <div
        className="ag-theme-material"
        style={{ height: 600, width: "90%", margin: "auto" }}
      >
        <AgGridReact
          rowData={customers}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
          suppressCellSelection={true}
        />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message={msg}
      />
    </React.Fragment>
  );
}

export default Customerlist;
