import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import { ResponsiveContainer } from "recharts";

function Calendar() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  console.log(trainings);

  let trainingTimes = [];

  if (trainings.length > 0) {
    trainings.forEach(function (event) {
      trainingTimes.push({
        title: `${event.activity} / ${event.customer.firstname}  ${event.customer.lastname}`,
        allDay: false,
        start: new Date(
          moment(event.date).format("YYYY"),
          moment(event.date).format("MM") - 1,
          moment(event.date).format("DD"),
          moment(event.date).format("HH"),
          moment(event.date).format("mm")
        ),
        end: new Date(
          moment(event.date).format("YYYY"),
          moment(event.date).format("MM") - 1,
          moment(event.date).format("DD"),
          moment(event.date)
            .clone()
            .add(event.duration, "minutes")
            .format("HH"),
          moment(event.date).clone().add(event.duration, "minutes").format("mm")
        ),
      });
    });
  }

  return (
    <ResponsiveContainer width="80%" aspect={1.5}>
      <FullCalendar
        plugins={[daygridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={trainingTimes}
        startAccessor="start"
        endAccessor="end"
      ></FullCalendar>
    </ResponsiveContainer>
  );
}

export default Calendar;
