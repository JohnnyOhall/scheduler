/*
INTERVIEW LIST COMPONENT: USED TO DISPLAY EACH INTERVIEW ITEM IN 
  THE MAIN APPLICATION DISPLAY
*/

// ------------- EXTERNAL IMPORTS --------------- //
import React from "react";
import PropTypes from 'prop-types'; 

import InterviewerListItem from "./InterviewerListItem"; // COMPONENT IMPORTS

import "components/InterviewerList.scss"; // STYLE IMPORTS


const InterviewerList = props => {

  const interviewerItem = props.interviewers.map( interviewer => {
    const { id, name, avatar } = interviewer, 
      { value, onChange } = props;

    return (
      <InterviewerListItem
        key={ id }
        name={ name }
        avatar={ avatar }
        selected={ id === value }
        setInterviewer={ e => onChange( id ) }
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{ interviewerItem }</ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;