import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY", SHOW = "SHOW", CREATE = "CREATE", SAVING = "SAVING";

export default function Appointment( props ) {
  const { time, interview, interviewers, bookInterview, id } = props,
    { mode, transition, back } = useVisualMode( interview ? SHOW : EMPTY );
  
  function save( name, interviewer ) {
    const interview = {
      student: name,
      interviewer
    };

    transition( SAVING )
    
    bookInterview( id, interview )
      .then(res => transition( SHOW ))
  };
  
  return (
    <article className="appointment">
      <Header time={ time } />
      { mode === EMPTY && <Empty onAdd={ () => transition( CREATE ) } /> }
      { mode === SHOW && (
        <Show
          student={ interview.student }
          interviewer={ interview.interviewer }
        />
      )}
      { mode === CREATE && (
        <Form 
          student=''
          interviewer={ null }
          interviewers={ interviewers }
          onSave={ save } 
          onCancel={ back }
        />
      )}
      { mode === SAVING && <Status message={ 'Saving' } /> }
    </article>
  );
}