import React from 'react'
import "components/Appointment/styles.scss";
import Show from './Show';
import Empty from './Empty';

export default function Appointment(props) {
  const parsedAppointments = props.appointments.map(appointment => {
    return (
      <article className="appointment"
      key={appointment.id}
      >
        {appointment.time}
        {appointment.interview ? 
        <Show 
        student={appointment.interview.student}
        interviewer={appointment.interview.interviewer.name}
        /> 
        : <Empty />}
      </article>
    )
  });
  return (
    <>
      {parsedAppointments}
      <article className="appointment" time="5pm">5pm
      </article>
    </>
  )
}
