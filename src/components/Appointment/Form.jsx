/*
FORM COMPONENT: THIS COMPONENT IS USED TO SUBMIT DATA TO DATABASE
  WHEN CREATING A NEW APPOINTMENT OR EDITING AN EXISTING.
*/

import React from 'react'; // EXTERNAL IMPORTS

// ------------------ COMPONENTS IMPORTS ----------------------- //
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import useFormData from 'hooks/useFormData';


export default function Form( props ) {
  const {
    interviewers,
    state,
    setState,
    cancel,
    validate
  } = useFormData( props );

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={ e => e.preventDefault( ) }>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={ state.studentName }
            onChange={ e => setState({ ...state, studentName: e.target.value })}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{ state.error }</section>
        <InterviewerList
          interviewers={ interviewers }
          value={ state.interviewerName }
          onChange={ e => setState({ ...state, interviewerName: e }) }      
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={ cancel }>Cancel</Button>
          <Button confirm onClick={ validate }>Save</Button>
        </section>
      </section>
    </main>
  );
};