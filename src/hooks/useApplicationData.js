import { useState } from "react";
import axios from "axios";
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    spots: []
  });

  //updates the remaining spots dynamically depending on where it was called from
  const updateSpots = (id, operation) => {
    let dayId = Math.ceil(id / 5)
    let newDays = state.days

    if (operation === "book") {
      newDays[dayId - 1].spots -= 1;
    }
    if (operation === "delete") {
      newDays[dayId - 1].spots += 1;
    }

    setState((prev) => ({
      ...prev,
      days: newDays
    }));

    console.log("spots has been updated", state.days[dayId].spots)
  };

  const bookInterview = (id, interview, update) => {
    console.log("this is the booked apt id:", id)
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
    let res = axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
    .then(()=>{
      if (update) {
        updateSpots(id, "book")
      }
    })
    return res;
  }

  const deleteInterview = (id) => {
    const interview = null;
    return axios.delete(`http://localhost:8001/api/appointments/${id}`, { data: { interview } })
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState((prev) => ({
          ...prev,
          appointments
        }));
        updateSpots(id, "delete");
      });
  }
  return { state, setState, bookInterview, deleteInterview, updateSpots };
};