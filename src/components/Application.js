import React, { useState, useEffect, Fragment } from "react";
//import Button from "./Button";
import DayList from "./DayList";
import axios from "axios";
import "components/Application.scss";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "../helpers/selectors"


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    dailyAppointments: []
  });

  const setDay = day => setState({ ...state, day });
  //const setDays = days => setState({ ...state, days });
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
    let res = axios.put(`http://localhost:8001/api/appointments/${id}`,{interview});
    return res;
  }

  const deleteInterview = (id) => {
    const interview = null;
    let res = axios.delete(`http://localhost:8001/api/appointments/${id}`,{data:{interview}}).then(console.log("delete done!"));
    return res;
  }

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, []);

  let dailyAppointments = [];
  let dailyInterviewers = [];
  dailyAppointments = getAppointmentsForDay(state, state.day);
  dailyInterviewers = getInterviewersForDay(state, state.day);
  const parsedAppointments = dailyAppointments.map(appointment => {
    return (
      <Appointment
        key={appointment.id}
        interview={getInterview(state, appointment.interview)}
        appointment={appointment}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
        interviewers={dailyInterviewers}
      />
    )
  });


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
          {parsedAppointments}
          <article className="appointment" time="5pm">5pm
          </article>
        </Fragment>
      </section>
    </main>
  );

}
