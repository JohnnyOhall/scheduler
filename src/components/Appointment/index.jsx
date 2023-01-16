import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Confirm from "./Confirm";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY", SHOW = "SHOW", CREATE = "CREATE", 
  SAVING = "SAVING", REMOVING = "REMOVING", CONFIRM = "CONFIRM",
  EDIT = "EDIT";

export default function Appointment( props ) {
  const { 
    time, 
    interview, 
    interviewers, 
    bookInterview, 
    id, 
    cancelInterview 
  } = props;

  const { mode, transition, back } = useVisualMode( interview ? SHOW : EMPTY );
  
  function save( name, interviewer ) {
    const interview = {
      student: name,
      interviewer
    };

    transition( SAVING )
    
    bookInterview( id, interview )
      .then( res => transition( SHOW ) )
  };

  function deleteApp() {
    const interview = {
      student: '',
      interviewer: null
    }

    transition( REMOVING )
    cancelInterview( id, interview)
      .then( res => transition( EMPTY ) )
  }

  return (
    <article className="appointment">
      <Header time={ time } />
      { mode === EMPTY && <Empty onAdd={ () => transition( CREATE ) } /> }
      { mode === SHOW && (
        <Show
          student={ interview.student }
          interviewer={ interview.interviewer }
          onDelete={ () => transition( CONFIRM ) } 
          onEdit={ () => transition( EDIT ) }
        />
      )}
      { mode === EDIT && (
        <Form 
          student={ interview.student }
          interviewer={ interview.interviewer.id }
          interviewers={ interviewers }
          onSave={ save } 
          onCancel={ back }
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
      { mode === REMOVING && <Status message={ 'Removing' } /> }
      { mode === CONFIRM && (
        <Confirm 
          message={ `Are you sure you'd like to delete?` }
          onConfirm={ deleteApp }
          onCancel={ back }
        />)}
    </article>
  );
}