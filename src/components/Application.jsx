/*
APPLICATION COMPONENT: USED TO DISPLAY THE ENTIRE APPLICATION
*/


import React from "react"; // EXTERNAL IMPORTS

// ----------------- HELPER FUNCTIONS  ----------------- // 
import { 
  getAppointmentsForDay, 
  getInterview, 
  getInterviewersForDay 
} from "helpers/selectors";

// ----------------- COMPONENTS  ----------------- // 
import DayList from "./DayList";
import Appointment from "./Appointment";

import useApplicationData from "hooks/useApplicationData"; // HOOK IMPORTS

import "components/Application.scss"; // STYLING IMPORTS


export default function Application( props ) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData(); // Hook Imports

  // ----------------- FUNCTIONS ----------------- //
  const interviewers = getInterviewersForDay( state, state.day );

  const appointments = getAppointmentsForDay( state, state.day )
    .map( appointment => {
      const interview = getInterview( state, appointment.interview ),
        { id, time } = appointment;
    
      return (
        <Appointment
          key={ id }
          id={ id }
          time={ time }
          interview={ interview }
          interviewers={ interviewers }
          bookInterview={ bookInterview }
          cancelInterview={ cancelInterview }
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
        { appointments }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};