import React from 'react'
import "components/InterviewerListItem.scss";
import classNames from "classnames";
import { action } from '@storybook/addon-actions/dist/preview';

export default function InterviewerListItem(props) {

  const interviewerListItemClass = classNames(
    "interviewers__item",
    { "interviewers__item--selected": props.selected },
  );

  return (
    <li className={interviewerListItemClass}
        onClick={() => {
          props.onChange(props.id);
          action("ok");
        }}
        key={props.key}
        >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
     {props.selected && props.name}
    </li>
  )
}
