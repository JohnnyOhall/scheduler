import { useState } from 'react'; // EXTERNAL IMPORTS

export default function useFormData( props ) {
  const { student, interviewer, interviewers, onSave, onCancel } = props;

  const [ state, setState ] = useState({
    studentName: student || '',
    interviewerName: interviewer || null,
    error: ''
  });
        
  const reset = () => {
    setState({
      ...state,
      studentName: '',
      interviewerName: null
    })
  }; // USED WHEN CANCELLING AN EDIT OR ADD REQUEST SO FORM IS BLANK

  const cancel = () => {
    reset( );
    onCancel( );
  }; // USED TO CANCEL AND GO BACK TO PREVIOUS STATE

  const validate = () => {
    if ( !state.studentName ) return setState({ ...state, error: "Student name cannot be blank" });
    if ( !state.interviewerName ) return setState({ ...state, error: "Please select an interviewer" });

    setState({ ...state, error: '' })
    return onSave( state.studentName, state.interviewerName );
  }; // USED TO ENSURE ALL REQUIRED FORM DATA IS ENTERED

  return {
    interviewers,
    state,
    setState,
    cancel,
    validate
  };
};