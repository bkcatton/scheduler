import React from 'react'
import InterviewerListItem from './InterviewerListItem';
import "components/InterviewList.scss";

export default function InterviewerList(props) {
  const parsedInterviewers = props.interviewers.map(interviewer => {

    return <InterviewerListItem
      key={interviewer.id}
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === (props.value ||  props.selectedInterviewer)}
      onChange={props.onChange}
    />
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light"></h4>
      <ul className="interviewers__list">
        {parsedInterviewers}
      </ul>
    </section>
  )
}
