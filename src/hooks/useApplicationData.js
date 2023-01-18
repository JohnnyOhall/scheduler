// ----------------- EXTERNAL IMPORTS ----------------- //
import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  // ----------------- STATES ----------------- //
  const [ state, setState ] = useState({
    day: "Monday",
    days: [ ],
    appointments: { },
    interviewers: { }
  });
  
  // ----------------- SERVER PULL ----------------- //
  useEffect( () => {
    Promise.all([
      axios.get( '/api/days' ),
      axios.get( '/api/appointments' ),
      axios.get( '/api/interviewers' )
    ]).then( all => {
      setState( prev => ({
        ...prev, 
        days: all[ 0 ].data, 
        appointments: all[ 1 ].data,
        interviewers: all[ 2 ].data
      }))
    });
  }, []);
  
  // ----------------- FUNCTIONS ----------------- //
  const setDay = day => setState( prev => ({ ...prev, day }));

  const updateSpots = function( appointments, id ) {
    const currentDay = state.days.find( day => day.appointments.includes( id ) );
    
    const spots = currentDay.appointments
      .filter( appointmentId => !appointments[ appointmentId ].interview )
      .length;
  
    return state.days.map( day => day.appointments.includes( id ) ? { ...day, spots } : day )
  }

  const bookInterview = ( id, interview ) => {
    const appointment = {
      ...state.appointments[ id ],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [ id ]: appointment
    };

    return axios.put( `/api/appointments/${id}`, { interview })
    .then( () => setState({ 
      ...state, 
      appointments, 
      days: updateSpots(appointments, id) 
    }));
  };
  

  const cancelInterview = ( id ) => {
    const appointment = {
      ...state.appointments[ id ],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [ id ]: appointment
    };

    return axios.delete( `/api/appointments/${ id }`)
    .then( () => setState({ 
      ...state, 
      appointments, 
      days: updateSpots( appointments, id ) 
    }));
  };

  return { state, setDay, bookInterview, cancelInterview };
};