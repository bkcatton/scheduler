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
