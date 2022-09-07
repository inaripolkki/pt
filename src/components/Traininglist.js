import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import Button from "@mui/material/Button";
import moment from "moment";
import { Snackbar } from "@mui/material";

function Traininglist() {
  const [trainings, setTrainings] = useState([]);
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  const deleteTraining = (id) => {
    console.log(id);
    if (window.confirm("Are you sure?")) {
      fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            fetchTrainings();
            setOpen(true);
            setMsg("Training deleted succesfully");
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const columns = [
    {
      field: "date",
      sortable: true,
      filter: true,
      width: 230,
      cellRenderer: (date) => {
        return moment(date.value).format("LLL");
      },
    },
    { field: "duration", sortable: true, filter: true, width: 140 },
    { field: "activity", sortable: true, filter: true, width: 140 },
    {
      headerName: "Customer",
      field: "customer.lastname",
      width: 160,
    },
    {
      headerName: "",
      field: "id",
      width: 120,
      cellRendererFramework: (params) => (
        <Button size="small" onClick={() => deleteTraining(params.value)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <React.Fragment>
      <div
        className="ag-theme-material"
        style={{ height: 600, width: "80%", margin: "auto" }}
      >
        <AgGridReact
          rowData={trainings}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={20}
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

export default Traininglist;
