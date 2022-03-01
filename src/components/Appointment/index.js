import React from 'react'
import "components/Appointment/styles.scss";
import Show from './Show';

export default function Appointment(props) {
  return (
    <article className="appointment">
      {props.time ? `${props.time} ` : "No appointments"} <Show />
    </article>
  )
}
