import { useState } from "react";

//Quote with highest vote Element

const Popular = (props) => {
  if (props.vote === 0) {
    return (
      <>
        <p>No Popular Quotes yet, Please Start voting!</p>
      </>
    );
  }
  return (
    <div>
      <h2>Most Voted Quote:</h2>
      <p>votes: {props.vote}</p>
      <p>
        <q>{props.popularQuote}</q>
      </p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [vote0, setvote0] = useState(0);
  const [vote1, setvote1] = useState(0);
  const [vote2, setvote2] = useState(0);
  const [vote3, setvote3] = useState(0);
  const [vote4, setvote4] = useState(0);
  const [vote5, setvote5] = useState(0);
  const [vote6, setvote6] = useState(0);
  const [vote7, setvote7] = useState(0);

  let votes = [0, 3, 0, 0, 0, 0, 0, 0];

  const randomQuote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };
  const quoteIndex = selected;

  let voteCollection = votes;
  let voteIndex = quoteIndex;

  const voteSmashed = () => {
    quoteIndex === 0 ? setvote0(vote0 + 1) : setvote0(vote0);
    quoteIndex === 1 ? setvote1(vote1 + 1) : setvote1(vote1);
    quoteIndex === 2 ? setvote2(vote2 + 1) : setvote2(vote2);
    quoteIndex === 3 ? setvote3(vote3 + 1) : setvote3(vote3);
    quoteIndex === 4 ? setvote4(vote4 + 1) : setvote4(vote4);
    quoteIndex === 5 ? setvote5(vote5 + 1) : setvote5(vote5);
    quoteIndex === 6 ? setvote6(vote6 + 1) : setvote6(vote6);
    quoteIndex === 7 ? setvote7(vote7 + 1) : setvote7(vote7);
  };
  votes[0] = vote0;
  votes[1] = vote1;
  votes[2] = vote2;
  votes[3] = vote3;
  votes[4] = vote4;
  votes[5] = vote5;
  votes[6] = vote6;
  votes[7] = vote7;

  //to find most voted quote
  const mostVoted = Math.max(
    vote0,
    vote1,
    vote2,
    vote3,
    vote4,
    vote5,
    vote6,
    vote7
  );
  console.log("most voted:", mostVoted);

  const mostVotedIndex = voteCollection.indexOf(mostVoted);
  console.log("Index of most voted:", mostVotedIndex);

  const votesOfPopularQuote = voteCollection[mostVotedIndex];

  const popularQuote = anecdotes[mostVotedIndex];

  return (
    <div>
      <h1>Quotes for Programmers</h1>
      <p>
        <q>{anecdotes[quoteIndex]}</q>
      </p>
      <br />
      <p style={{ display: "inline" }}>votes gained: </p>
      {voteCollection[voteIndex]}
      <br />
      <button onClick={voteSmashed}>Vote</button>
      <br />
      <br />
      <button onClick={randomQuote}>Next Quote</button>
      <br />
      <hr />
      <br />
      <Popular vote={votesOfPopularQuote} popularQuote={popularQuote} />
    </div>
  );
};

export default App;
