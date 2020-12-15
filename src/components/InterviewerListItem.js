import React from "react";

import "./InterviewerListItem.scss";

import classnames from "classnames";


export default function InterviewerListItem(props) {
  const interviewerClass = classnames(
    "interviewers__item", 
    {"interviewers__item--selected": props.selected}
  );

  const interviewerImgClass = classnames(
    "interviewers__item-image", 
    {"interviewers__item--selected-image": props.selected}
  );

  return (
    <li className={interviewerClass}
        onClick={() => props.onChange(props.id)}  
    >
      <img
        className={interviewerImgClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}

//