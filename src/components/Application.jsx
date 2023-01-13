// ----------------- IMPORTS ----------------- //

import React, { useState, useEffect } from "react";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

import axios from "axios";
import DayList from "./DayList";
import Appointment from "./Appointment";

import "components/Application.scss";


export default function Application( props ) {
  
  // ----------------- STATES ----------------- //

  const [ state, setState ] = useState({
    day: "Monday",
    days: [ ],
    appointments: { }
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
  const dailyAppointments = getAppointmentsForDay( state, state.day );
  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map( appointment => {
    const interview = getInterview( state, appointment.interview ),
      { id, time } = appointment;
    
    return (
      <Appointment
        key={ id }
        id={ id }
        time={ time }
        interview={ interview }
      />
    );
  });

  const appointmentsArr = dailyAppointments.map( appointment => {
    return (
      <Appointment
        key={ appointment.id }
        { ...appointment }
      />
    ); 
  });

  // ----------------- HTML ----------------- //
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={ state.days }
            value={ state.day }
            onChange={ setDay }
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        { appointmentsArr }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}