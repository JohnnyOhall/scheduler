import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";


export default function InterviewerList( props ) {
  const interviewerItem = props.interviewers.map( i => {
    const { id, name, avatar } = i, 
      {interviewer, setInterviewer} = props;

    return (
      <InterviewerListItem
        key={ id }
        name={ name }
        avatar={ avatar }
        selected={ id === interviewer }
        setInterviewer={ e => setInterviewer( id ) }
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