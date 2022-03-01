import React, { useState, useEffect, Fragment } from "react";
//import Button from "./Button";
import DayList from "./DayList";
import axios from "axios";
import "components/Application.scss";
import Appointment from "./Appointment";
import {getAppointmentsForDay} from "../helpers/selectors"


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  let dailyAppointments = [];
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState({ ...state, days });
  
  useEffect(() => {
  Promise.all([
    axios.get(`http://localhost:8001/api/days`),
    axios.get(`http://localhost:8001/api/appointments`),
    axios.get(`http://localhost:8001/api/interviewers`)
  ]).then((all) => {
    setState(prev => ({...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data}))
  })
}, []);

dailyAppointments = getAppointmentsForDay(state, state.day);

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
            days={state.days}
            value={state.day}
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
        <Fragment>
          <Appointment
            appointments={dailyAppointments}
          />
        </Fragment>
      </section>
    </main>
  );

}

// const schedule = appointments.map((appointment) => {
//   const interview = getInterview(state, appointment.interview);

//   return (
//     <Appointment
//       key={appointment.id}
//       id={appointment.id}
//       time={appointment.time}
//       interview={interview}
//     />
//   );
// // });