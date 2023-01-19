/*
INTERVIEW LIST ITEM COMPONENT: USED TO DISPLAY DATA FOR EACH INDIVIDUAL 
  INTERVIEW ITEM IN THE MAIN APPLICATION DISPLAY
*/

// ------------- EXTERNAL IMPORTS --------------- //
import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss"; // STYLE IMPORTS


export default function InterviewerListItem( props ) {
  const { name, avatar, setInterviewer, selected } = props;

  const interviewersClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  });

  return (
    <li className={ interviewersClass } onClick={ setInterviewer }>
      <img
        className="interviewers__item-image"
        src={ avatar }
        alt={ name }
      />
      { selected && name }
    </li>
  );
};