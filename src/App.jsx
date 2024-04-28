import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import DateDifferenceCalculator from './DateDifferenceCalculator'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  /* returns a home page that takes two dates with respective time and timezones and returns the difference */
  return (
    <>
      <div>
        <h1>FlightTimeCalculator</h1>
        <p>Calculate the time between two dates</p>
        <DateDifferenceCalculator />
      </div>
    </>
  )
}

export default App

/* 
        <h1>FlightTimeCalculator</h1>
        <p>Calculate the time between two dates</p>
        <p>Enter the first date and time</p>
        <input type="datetime-local" id="datetime1" name="datetime1"></input>
        <p>Enter first timezone</p>
        <input type="text" id="timezone1" name="timezone1"></input>
        <p>Enter the second date and time</p>
        <input type="datetime-local" id="datetime2" name="datetime2"></input>
        <p>Enter second timezone</p>
        <input type="text" id="timezone2" name="timezone2"></input>
        <button onClick={() => {
          const datetime1 = document.getElementById("datetime1").value;
          const timezone1 = document.getElementById("timezone1").value;
          const datetime2 = document.getElementById("datetime2").value;
          const timezone2 = document.getElementById("timezone2").value;
          console.log(datetime1, timezone1, datetime2, timezone2);
          var date = moment().tz()
          const d1 = new Date(datetime1);
          const d2 = new Date(datetime2);

        }}>Calculate</button>
*/