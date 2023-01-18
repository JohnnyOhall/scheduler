import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Confirm from "./Confirm";
import Error from "./Error";

import "components/Appointment/styles.scss";

// ------------------ MODES ------------------ //
const EMPTY = "EMPTY", SHOW = "SHOW", CREATE = "CREATE", 
  SAVING = "SAVING", REMOVING = "REMOVING", CONFIRM = "CONFIRM",
  EDIT = "EDIT", ERROR_SAVE = "ERROR_SAVE", ERROR_DELETE = 'ERROR_DELETE';
  
let errorMsg = ''; // Error message handling return

export default function Appointment( props ) {
  
  const { time, interview, interviewers, 
    bookInterview, id, cancelInterview } = props;

  const { mode, transition, back } = useVisualMode( interview ? SHOW : EMPTY );
  
  const save = ( name, interviewer ) => {
    const interview = {
      student: name,
      interviewer
    };

    transition( SAVING );
    
    bookInterview( id, interview )
      .then( () => transition( SHOW ) )
      .catch( err => {
        errorMsg = 
          `Error Code: ${ err.response.status }, 
            Message: ${ err.response.statusText }` 
        transition( ERROR_SAVE, true )
      });
  };

  const destroy = () => {
    transition( REMOVING, true )

    cancelInterview( id )
      .then( () => transition( EMPTY ) )
      .catch( err => {
        errorMsg = 
          `Error Code: ${err.response.status}, 
            Message: ${err.response.statusText}`
        transition( ERROR_DELETE, true )
      });
  };

  return (
    <article className="appointment" data-testid="appointment">
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
      { mode === SAVING && <Status message='Saving'/> }
      { mode === REMOVING && <Status message='Removing'/> }
      { mode === CONFIRM && (
        <Confirm 
          message={ `Are you sure you'd like to delete?` }
          onConfirm={ destroy }
          onCancel={ back }
        />
      )}
      { mode === ERROR_SAVE && (
        <Error 
          type='ERROR SAVING' 
          message={ errorMsg } 
          onClose={ back } 
        /> 
      )}
      { mode === ERROR_DELETE && (
        <Error 
          type='ERROR DELETING' 
          message={ errorMsg } 
          onClose={ back } 
        /> 
      )}
    </article>
  );
}