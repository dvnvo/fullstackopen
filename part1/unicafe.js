import { useState } from 'react'

const Button = ({click, text}) => {
  return (
    <button onClick={click}>{text}</button>
  )
}

const StatisticLine = ({status, text}) => {
  return (
    <tr>
      <td>{text} </td>
      <td>{status}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props

  let all = good + neutral + bad
  let average = (good*1 + neutral*0 + bad*-1) / all
  let positive = (good / all)
  let positive100 = positive*100 + '%'

  if (good === 0 && neutral === 0 && bad === 0) {
    return (<div>No feedback given</div>)
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine status={good} text="good"/>
          <StatisticLine status={neutral} text="neutral"/>
          <StatisticLine status={bad} text="bad"/>

          <StatisticLine status={all} text="all"/>
          <StatisticLine status={average} text="average"/>
          <StatisticLine status={positive100} text="positive"/>
        </tbody>
      </table>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodButton = () => {
    setGood(good + 1)
  }

  const neutralButton = () => {
    setNeutral(neutral + 1)
  }

  const badButton = () => {
    setBad(bad + 1)
  }



  return (
    <div>
      <h1>give feedback</h1>
      <Button click={goodButton} text="good"/>
      <Button click={neutralButton} text="neutral"/>
      <Button click={badButton} text="bad"/>

      <h1>statistics</h1>
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App
