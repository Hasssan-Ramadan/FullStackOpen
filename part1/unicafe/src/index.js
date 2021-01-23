import React, { useState } from "react";
import ReactDOM from "react-dom";

const Display = ({ text }) => <h1>{text}</h1>;

const Button = ({ text, handler }) => <button onClick={handler}>{text}</button>;

const Statistic = ({ text, value, persentage=""}) => (
  <p>
    {text} {value}{persentage}
  </p>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  if (all === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={all} />
      <Statistic text="average" value={average} />
      <Statistic text="positive" value={positive} persentage={"%"}/>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // event handlers to increment number of votes once any button clicked
  const incrementGood = () => {
    setGood(good + 1);
  };
  const incrementNeutral = () => {
    setNeutral(neutral + 1);
  };
  const incrementBad = () => {
    setBad(bad + 1);
  };

  return (
    <>
      <Display text="give feedback" />
      <Button text="good" handler={incrementGood} />
      <Button text="neutral" handler={incrementNeutral} />
      <Button text="bad" handler={incrementBad} />
      <Display text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
