import React, { useState } from "react";
import ReactDOM from "react-dom";

const Display = ({ text }) => <h1>{text}</h1>;

const Button = ({ text, handler }) => <button onClick={handler}>{text}</button>;

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
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
