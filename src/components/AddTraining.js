import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";

function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });
  const [training, setTraining] = useState({
    date: "",
    duration: "",
    activity: "",
    customer: "",
  });

  const handleClickOpen = () => {
    setCustomer({
      firstname: props.params.data.firstname,
      lastname: props.params.data.lastname,
      streetaddress: props.params.data.streetaddress,
      postcode: props.params.data.postcode,
      city: props.params.data.city,
      email: props.params.data.email,
      phone: props.params.data.phone,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const newTraining = {
      ...training,
      date: new Date(training.date),
      customer: props.params.data.links[0].href,
    };
    props.addTraining(newTraining);
    handleClose();
  };

  const inputChanged = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const activities = [
    { value: "Zumba", label: "Zumba" },
    { value: "Pilates", label: "Pilates" },
    { value: "Fitness", label: "Fitness" },
    { value: "Gym Training", label: "Gym Training" },
    { value: "Spinning", label: "Spinning" },
    { value: "Jogging", label: "Jogging" },
  ];

  return (
    <div>
      <Button onClick={handleClickOpen}>Add Training</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <TextField
            name="date"
            type="datetime-local"
            value={training.date}
            onChange={inputChanged}
            margin="dense"
            fullWidth
            variant="standard"
          />
          <TextField
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            margin="dense"
            label="Duration"
            fullWidth
            variant="standard"
          />

          <TextField
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            margin="dense"
            select
            label="Activity"
            fullWidth
            variant="standard"
          >
            {activities.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            name="customer"
            value={customer.firstname + " " + customer.lastname}
            onChange={inputChanged}
            margin="dense"
            label="Customer"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AddTraining;
