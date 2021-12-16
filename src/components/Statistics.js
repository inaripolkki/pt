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

  var kaikkiYhteensa = _.sumBy(trainings, "duration");

  console.log(kaikkiYhteensa);

  let output = _.groupBy(trainings, "activity");

  console.log(output);

  var FitnessDuration = {
    name: "Fitness",
    duration: _.sumBy(output.Fitness, "duration"),
  };
  var ZumbaDuration = {
    name: "Zumba",
    duration: _.sumBy(output.Zumba, "duration"),
  };
  var SpinningDuration = {
    name: "Spinning",
    duration: _.sumBy(output.Spinning, "duration"),
  };
  var PilatesDuration = {
    name: "Pilates",
    duration: _.sumBy(output.Pilates, "duration"),
  };
  var gym = "Gym training";
  //gym = gym.replace(/ /g, "");
  console.log(gym);

  var GymDuration = {
    name: "Gym training",
    duration: _.sumBy(output.gym, "duration"),
  };
  var JoggingDuration = {
    name: "Jogging",
    duration: _.sumBy(output.Jogging, "duration"),
  };

  console.log(FitnessDuration);
  console.log(ZumbaDuration);
  console.log(SpinningDuration);
  console.log(PilatesDuration);
  console.log(GymDuration);

  const data = [
    FitnessDuration,
    ZumbaDuration,
    SpinningDuration,
    PilatesDuration,
    GymDuration,
    JoggingDuration,
  ];

  console.log(data);

  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="duration" fill="darkgray" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default Statistics;
