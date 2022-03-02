
export function getAppointmentsForDay(state, day) {
  //return an array of appointments based on a given day
  const givenDay = state.days.filter(d => d.name === day)[0];
  if (givenDay === undefined || state.days.length === 0) {
    return [];
  }
  
  const filteredApts = [];
  givenDay.appointments.forEach(appointmentId => filteredApts.push(state.appointments[appointmentId]));
  return filteredApts
};

export function getInterview (state, interview) {
  if (interview === null) {
    return null;
  }
  const intVal = interview.interviewer;
  const returnVal = 
  {
    "student": interview.student,
    "interviewer": {
      "id": state.interviewers[intVal].id,
      "name": state.interviewers[intVal].name,
      "avatar": state.interviewers[intVal].avatar
    }
  }
  return returnVal;
};

export function getInterviewersForDay(state, day) {
  //return an array of interviewers based on a given day
  const givenDay = state.days.filter(d => d.name === day)[0];
  if (givenDay === undefined || state.days.length === 0) {
    return [];
  }
  
  const filteredApts = [];
  givenDay.appointments.forEach(appointmentId => filteredApts.push(state.appointments[appointmentId]));
  return filteredApts
};
