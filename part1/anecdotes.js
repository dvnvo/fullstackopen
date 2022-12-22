import { useState } from 'react'

const Button = ({click, text}) => {
  return (
    <button onClick={click}> {text}</button>
  )
}

const Point = ({points}) => {
  return (
    <p> has {points} votes</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const len = anecdotes.length

  const random = () => {
    return Math.floor(Math.random() * len)
  }
  const [selected, setSelected] = useState(random())

  const points = new Uint8Array(len); 
  const [votes, setVotes] = useState(points)

  const nextButton = () => {
    setSelected(random())
  }

  const addPoint = (selected) => {
    let copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  let maxIndex = votes.indexOf(Math.max(...votes))
  console.log("maxIndex", maxIndex)

  return (
    <div>
      <h1>Anecodote of the day</h1>
      {anecdotes[selected]}
      <Point points={votes[selected]}/>
      <br/>

      <Button click={() => addPoint(selected)} text="vote" />
      <Button click={nextButton} text="next anecodote" />

      <h1>Anecdote with most votes</h1>
      {anecdotes[maxIndex]}
      <Point points={votes[maxIndex]}/>
    </div>
  )
}

export default App
