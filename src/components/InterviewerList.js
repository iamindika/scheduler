import React from "react";
import PropTypes from 'prop-types';

import InterviewerListItem from "components/InterviewerListItem";

import "./InterviewerList.scss";

export default function InterviewerList(props) {

  const interviewersAvailable = props.interviewers.map(interviewer => {
    
    return (
      <InterviewerListItem 
          key={interviewer.id}
          id={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected={props.value === interviewer.id}
          onChange={props.onChange}
      />  
    )
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersAvailable}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};