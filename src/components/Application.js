import React, { useEffect, Fragment } from "react";
import DayList from "./DayList";
import axios from "axios";
import "components/Application.scss";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "../helpers/selectors"
import useApplicationData from "hooks/useApplicationData";


export default function Application(props) {
  const {state, setState, bookInterview, deleteInterview, updateSpots} = useApplicationData();

  const setDay = day => setState({ ...state, day });

  useEffect(
    () => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }))
    }).then(()=>{
      
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
        updateSpots={updateSpots}
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
