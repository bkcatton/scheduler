import React from 'react'
import "components/Appointment/styles.scss";
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import axios from "axios";
import { useVisualMode } from 'hooks/useVisualMode';
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_CREATE = "ERROR_CREATE";


export default function Appointment(props) {

  function save(name, interviewer) {
    if (name === "" || interviewer === 0) {
      transition(ERROR_CREATE);
      return;
    }
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.appointment.id, interview)
      .then(() => setTimeout(transition(SHOW), 1000))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  function deleteInt(id) {
    transition(DELETE)
    props.deleteInterview(id)
      .then(() => setTimeout(transition(EMPTY), 1000))
      .catch((error) => transition(ERROR_DELETE, true));
  }

  function confirmDelete() {
    transition(CONFIRM)
  }



  const { mode, transition, back } = useVisualMode(
    props.appointment.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment"
      key={props.appointment.id}
    >
      {props.appointment.time}

      {mode === ERROR_CREATE && <Form
        id={props.appointment.id}
        interviewers={props.interviewers}
        save={save} name={props.appointment.student}
        message={"You must select an interviewer and provide a student name"}
        onCancel={() => back()}
      />}

      {mode === ERROR_DELETE && <Error
        onClose={() => back()}
        message={"Problems connecting to database, could not delete. Sorry."} />}

      {mode === ERROR_SAVE && <Error
        onClose={() => back()}
        message={"Problems connecting to database, could not save. Sorry."} />}

      {mode === EDIT && <Form
        id={props.appointment.id}
        interviewers={props.interviewers}
        save={save} name={props.appointment.student}
        student={props.interview.student}
        interviewerID={props.interview.interviewer.id}
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
      />}

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          id={props.appointment.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          confirmDelete={confirmDelete}
          onEdit={() => transition(EDIT)}
        />
      )}
    </article>
  )
};

