export function getAppointmentsForDay( state, day ) {
  const filtered = state.days.find( d => d.name === day );

  if ( !filtered ) return [ ];

  return filtered.appointments.map( id => state.appointments[ id ] );
}; // USED TO DISPLAY APPOINTMENTS WHEN DAY HAS BEEN CHANGED

export function getInterview( state, interview ) {
  if ( !interview ) return null;

  return {
    ...interview, 
    interviewer: state.interviewers[ interview.interviewer ]
  };
}; // USED TO DISPLAY INTERVIEW DATA WHEN CLICKED

export function getInterviewersForDay( state, day ) {
  const filtered = state.days.find( d => d.name === day );

  if ( !filtered ) return [ ];

  return filtered.interviewers.map( id => state.interviewers[ id ] );
}; // USED TO DISPLAY AVAILABLE INTERVIEWERS FOR EACH DAY