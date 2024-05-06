import { useState } from 'react'
import DateDifferenceCalculator from './DateDifferenceCalculator'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  /* returns a home page that takes two dates with respective time and timezones and returns the difference */
  return (
    <>
      <div className='App'>
        <h1>BlockPayCalculator</h1>
        <p>Calculate the time between two dates</p>
        <DateDifferenceCalculator />
      </div>
    </>
  )
}

export default App
