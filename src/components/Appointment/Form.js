import React, { useState, Fragment } from 'react';
import Button from 'components/Button'
import InterviewerList from 'components/InterviewerList'


export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || 0);
  
  const reset = function () {
    setInterviewer("");
    setStudent("");
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="nameOfStudent"
            type="text"
            value={student}
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        Interviewer
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel} >Cancel</Button>
          <Button onClick={() => props.save(student, interviewer)} >Save</Button>
        </section>
      </section>
      
    </main>
  )
}
