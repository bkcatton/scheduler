import React, { useState, useEffect } from "react";
//import Button from "./Button";
import DayList from "./DayList";
import axios from "axios";
import "components/Application.scss";



export default function Application(props) {
  const [days, setDays] = useState([]);

  useEffect(() => {
    const testURL = `http://localhost:8001/api/days`;
    axios.get(testURL).then(response => {
      setDays([...response.data])
      //days = response;
      console.log(response.data);
    });
  }, []);
  
  const [day, setDay] = useState(["Monday"]);
  //console.log(day);
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            value={day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
  
}
