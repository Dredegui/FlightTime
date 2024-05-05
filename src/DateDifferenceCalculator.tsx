import React, { useState } from 'react';

const DateDifferenceCalculator: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [differenceHours, setDifferenceHours] = useState<number | null>(null);
  const [differenceMinutes, setDifferenceMinutes] = useState<number | null>(null);
  const [differenceSeconds, setDifferenceSeconds] = useState<number | null>(null);
  const [blockPayHours, setBlockPayHours] = useState<number | null>(null);
  const [blockPayMinutes, setBlockPayMinutes] = useState<number | null>(null);
  const [blockPaySeconds, setBlockPaySeconds] = useState<number | null>(null);
  
  // map of strings to integers
  const map = {
      'LIS': 0,
      'OPO': 0,
      'FNC': 0,
      'REC': -4,
      'SSA': -4,
      'GIG': -4,
      'GRU': -4,
      'CNF': -4,
      'FOR': -4,
      'BSB': -4,
      'POA': -4,
      'CUN': -5,
      'CCS': -5,
      'EWR': -5,
      'JFK': -5,
      'MIA': -5,
      'IAD': -6,
      'SFO': -6,
      'LAD': 0,
      'MPM': 1
  };

  const [startAir, setStartAir] = useState("LIS"); // default to "LIS"
  const [endAir, setEndAir] = useState("LIS"); // default to "LIS"
  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleStartAirChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStartAir(event.target.value);
  };

    const handleEndAirChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setEndAir(event.target.value);
    };

  const secondsToHms = (d: number) => {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);
    return [h, m, s]
  }

  const calculateBlockPay = () => {
    if (startDate && endDate) {
        const startDateTime = new Date(startDate);
        const endDateTime = new Date(endDate);
        if (startAir === '' || endAir === '') {
        alert('Please enter the airport codes');
        return;
        } else if (map[startAir] == undefined || map[endAir] == undefined) {
        alert('Invalid airport code');
        return;
        }
        startDateTime.setTime(startDateTime.getTime() - (map[startAir] * 3600 * 1000));
        endDateTime.setTime(endDateTime.getTime() - (map[endAir] * 3600 * 1000));
        const differenceInMilliseconds = Math.abs(endDateTime.getTime() - startDateTime.getTime());
        var differenceInSeconds = differenceInMilliseconds / 1000;
        // for every hour after 1900, add 1.25x
        var tempStart = new Date(startDateTime);
        var changedStart = false;
        var reached = false;
        while (tempStart <= endDateTime) {
            if (tempStart.getHours() < 19 && tempStart.getHours() >= 6) {
                tempStart.setHours(tempStart.getHours() + 1);
                changedStart = true;
            } else {
                if (changedStart) {
                  tempStart.setHours(19);
                  tempStart.setMinutes(0);
                  tempStart.setSeconds(0);
                }
                reached = true;
                break;
            }
        }
        if (reached) {
          var tempEnd = new Date(endDateTime);
          var changedEnd = false;
          while (tempEnd >= startDateTime) {
            if (tempEnd.getHours() < 19 && tempEnd.getHours() >= 6) {
              tempEnd.setHours(tempEnd.getHours() - 1);
              changedEnd = true;
            } else {
              if (changedEnd) {
                tempEnd.setHours(6);
                tempEnd.setMinutes(0);
                tempEnd.setSeconds(0);
              }
              break;
            }
          }
          console.log("tempStart: " + tempStart);
          console.log("tempEnd: " + tempEnd);
          const blockPayTime = Math.abs(tempEnd.getTime() - tempStart.getTime()) / 1000
          console.log("blockPayTime: " + blockPayTime);
          console.log("differenceInSeconds: " + differenceInSeconds);
          differenceInSeconds = differenceInSeconds - blockPayTime + (blockPayTime * 1.25); 
        }
        const hours = Math.floor(differenceInSeconds / 3600);
        differenceInSeconds -= hours * 3600;
        const minutes = Math.floor(differenceInSeconds / 60);
        differenceInSeconds -= minutes * 60;
        setBlockPayHours(hours);
        setBlockPayMinutes(minutes);
        setBlockPaySeconds(differenceInSeconds);
    }
  };

  const calculateDifferenceHelper = () => {
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);
    const differenceInMilliseconds = Math.abs(endDateTime.getTime() - startDateTime.getTime());
    var differenceInSeconds = differenceInMilliseconds / 1000;
    console.log("startAir: " + startAir);
    console.log("endAir: " + endAir);
    console.log("map[startAir]: " + map[startAir]);
    console.log("map[endAir]: " + map[endAir]);
    if (startAir === '' || endAir === '') {
    alert('Please enter the airport codes');
    return;
    } else if (map[startAir] == undefined || map[endAir] == undefined) {
    alert('Invalid airport code');
    return;
    }
    differenceInSeconds += map[startAir] * 3600;
    differenceInSeconds -= map[endAir] * 3600;
    const hours = Math.floor(differenceInSeconds / 3600);
    differenceInSeconds -= hours * 3600;
    const minutes = Math.floor(differenceInSeconds / 60);
    differenceInSeconds -= minutes * 60;
    return [hours, minutes, differenceInSeconds];
  };

  const calculateDifference = () => {
    if (startDate && endDate) {
      const temp = calculateDifferenceHelper();
      if (temp === undefined) {
        return;
      }
      const hours = temp[0];
      const minutes = temp[1];
      const differenceInSeconds = temp[2];
      setDifferenceHours(hours);
      setDifferenceMinutes(minutes);
      setDifferenceSeconds(differenceInSeconds);      
    }
  };

  return (
    <div className="main">
      <div className="container">
        <div>
          <label>Start Airport: </label>
          <select value={startAir} onChange={handleStartAirChange}>
            {Object.keys(map).map((airport) => (
              <option key={airport} value={airport}>{airport}</option>
            ))}
          </select> 
        </div>
        <div>
          <label>Start Date - Time: </label>
          <input type="datetime-local" value={startDate} onChange={handleStartDateChange} />
        </div>
      </div>
      <div className="container">
        <div>
          <label>End Airport: </label>
          <select value={endAir} onChange={handleEndAirChange}>
            {Object.keys(map).map((airport) => (
              <option key={airport} value={airport}>{airport}</option>
            ))}
          </select>
        </div>
        <div>
          <label>End Date - Time: </label>
          <input type="datetime-local" value={endDate} onChange={handleEndDateChange} />
        </div>
      </div>
      <div className="buttons">
        <div>
          <button onClick={calculateDifference}>Block Time</button>
          <br />
          {differenceHours !== null && differenceMinutes !== null && differenceSeconds !== null && (
            <div>
              <label>Hours: {differenceHours}</label>
              <br />
              <label>Minutes: {differenceMinutes}</label>
              <br />
              <label>Seconds: {differenceSeconds}</label>
            </div>
          )}
        </div>
        <div>
          <button onClick={calculateBlockPay}>Block Pay</button>
          <br />
          {blockPayHours !== null && blockPayMinutes !== null && blockPaySeconds !== null && (
            <div>
              <label>Hours: {blockPayHours}</label>
              <br />
              <label>Minutes: {blockPayMinutes}</label>
              <br />
              <label>Seconds: {blockPaySeconds}</label>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateDifferenceCalculator;
