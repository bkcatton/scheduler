import React from 'react'
import "components/Appointment/styles.scss";
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import { useVisualMode, transition } from 'hooks/useVisualMode';
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";


export default function Appointment(props) {

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.appointment.id, interview);
    transition(SAVING);
    setTimeout(() => { transition(SHOW) }, 900);
  }

  function deleteInt(id) {
    props.deleteInterview(id);
    transition(DELETE);
    setTimeout(() => { transition(EMPTY) }, 900);
  }

  function confirmDelete() {
    transition(CONFIRM)
  }

  function onEdit(name, interviewer) {
    save(name, interviewer);
  }


  const { mode, transition, back } = useVisualMode(
    props.appointment.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment"
      key={props.appointment.id}
    >
      {props.appointment.time}
      {mode === EDIT && <Form
        id={props.appointment.id}
        interviewers={props.interviewers}
        save={save} name={props.appointment.student}
        onCancel={() => back()}
      />}
      {mode === CONFIRM && <Confirm
        id={props.appointment.id}
        onDelete={deleteInt}
        onCancel={() => back()}
        message={"Do you realllly want to delete this appointment?!"}
      />}
      {mode === DELETE && <Status message={"Deleting appointment!"} />}
      {mode === SAVING && <Status message={"saving appointment!"} />}
      {mode === CREATE && <Form
        id={props.appointment.id}
        interviewers={props.interviewers}
        save={save} name={props.appointment.student}
        onCancel={() => back()}
        onCancel={() => back()}
      />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          id={props.appointment.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          confirmDelete={confirmDelete}
        />
      )}
    </article>
  )
};

