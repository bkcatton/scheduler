import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    spots: []
  });
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
    let res = axios.put(`http://localhost:8001/api/appointments/${id}`, { interview });
    return res;
  }
  const deleteInterview = (id) => {
    const interview = null;
    let res = axios.delete(`http://localhost:8001/api/appointments/${id}`, { data: { interview } }).then(console.log("delete done!"));
    return res;
  }
  return {state, setState, bookInterview, deleteInterview};
};