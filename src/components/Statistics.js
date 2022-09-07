import { XAxis, CartesianGrid } from "recharts";
import React, { useState, useEffect } from "react";
import { BarChart, Bar, YAxis, ResponsiveContainer } from "recharts";

function Statistics() {
  let _ = require("lodash");

  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data.content))
      .catch((err) => console.error(err));
  };
  //console.log(trainings);

  let sortedByActivity = _.groupBy(trainings, "activity");

  //console.log(sortedByActivity);

  const data = _.map(sortedByActivity, _.sumBy(sortedByActivity, "duration"));

  //console.log(data);

  return (
    <div>
      <p>Total duration of activities</p>
      <ResponsiveContainer width="80%" aspect={2}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="activity" />
          <YAxis />
          <Bar dataKey="duration" fill="darkgray" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Statistics;
