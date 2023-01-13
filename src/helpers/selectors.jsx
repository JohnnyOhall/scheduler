export function getAppointmentsForDay( state, day ) {
  const filteredDays = state.days.find( dayName => dayName.name === day );

  if ( !filteredDays ) return [ ];

  const output = filteredDays.appointments.map( id => state.appointments[ id ] );

  return output;
};

export function getInterview( state, interview ) {
  if ( !interview ) return null;

  const output = {
    ...interview, 
    interviewer: state.interviewers[ interview.interviewer ]
  };

  return output;
};
