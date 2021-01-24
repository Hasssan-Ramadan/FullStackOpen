import React, { useState } from "react";
import ReactDOM from "react-dom";

const Anecdotes = ({ header, text, numberOfVotes }) => {
  return (
    <>
      <h1>{header}</h1>
      <p>{text}</p>
      <p>has {numberOfVotes} votes</p>
    </>
  );
};

const Button = ({ value, handler }) => {
  return <button onClick={handler}>{value}</button>;
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(6).fill(0));
  const [max, setMax] = useState([0, 0]);

  const next = () => setSelected(Math.round(Math.random() * 5));
  const vote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    if (newVotes[selected] > max[0]) {
      setMax([newVotes[selected], selected]);
    }
    setVotes([...newVotes]);
  };

  return (
    <>
      <Anecdotes
        header="Anecdotes of the day"
        text={anecdotes[selected]}
        numberOfVotes={votes[selected]}
      />
      <Button value="vote" handler={vote} />
      <Button value="next anecdotes" handler={next} />
      <Anecdotes
        header="Anecdotes with most votes"
        text={anecdotes[max[1]]}
        numberOfVotes={max[0]}
      />
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
