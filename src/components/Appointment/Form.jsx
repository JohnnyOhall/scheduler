import React, { useState } from 'react';

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const { student, interviewer, interviewers, onSave, onCancel } = props,
    [ studentName, setStudentName ] = useState( student || '' ),
      [ interviewerName, setInterviewerName ] = useState( interviewer || null );

  const reset = () => {
    setStudentName( '' )
    setInterviewerName( null )
  };

  const cancel = () => {
    reset()
    onCancel()
  };

  const save = () => onSave( studentName, interviewerName );

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={ e => e.preventDefault() }>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={ studentName }
            onChange={ e => setStudentName( e.target.value ) }
          />
        </form>
        <InterviewerList
          interviewers={ interviewers }
          value={ interviewerName }
          onChange={ setInterviewerName }       
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={ cancel }>Cancel</Button>
          <Button confirm onClick={ save }>Save</Button>
        </section>
      </section>
    </main>
  );
}