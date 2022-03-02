import React from 'react'
import "components/Appointment/styles.scss";
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import { useVisualMode, transition } from 'hooks/useVisualMode';
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
  }

    const { mode, transition, back } = useVisualMode(
      props.appointment.interview ? SHOW : EMPTY
    );

    return (
      <article className="appointment"
        key={props.appointment.id}
      >
        {props.appointment.time}
        {mode === CREATE && <Form onCancel={() => back()}/>}
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.appointment.interview.student}
            interviewer={props.appointment.interview.interviewer.name}
          />
        )}
      </article>
    )
  };

  