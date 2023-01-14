export function getAppointmentsForDay( state, day ) {
  const filtered = state.days.find( d => d.name === day );

  if ( !filtered ) return [ ];

  return filtered.appointments.map( id => state.appointments[ id ] );
};

export function getInterview( state, interview ) {
  if ( !interview ) return null;

  return {
    ...interview, 
    interviewer: state.interviewers[ interview.interviewer ]
  }
};

export function getInterviewersForDay( state, day ) {
  const filtered = state.days.find( d => d.name === day );

  if ( !filtered ) return [ ];

  return filtered.interviewers.map( id => state.interviewers[ id ] );
};