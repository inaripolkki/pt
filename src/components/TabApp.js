import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import Customerlist from "./Customerlist";
import Traininglist from "./Traininglist";
import Calendar from "./Calendar";
import Statistics from "./Statistics";

function TabApp() {
  const [value, setValue] = useState("customers");

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab value="customers" label="customers" />
        <Tab value="trainings" label="trainings" />
        <Tab value="calendar" label="calendar" />
        <Tab value="statistics" label="statistics" />
      </Tabs>
      {value === "customers" && <Customerlist />}
      {value === "trainings" && <Traininglist />}
      {value === "calendar" && <Calendar />}
      {value === "statistics" && <Statistics />}
    </div>
  );
}

export default TabApp;
