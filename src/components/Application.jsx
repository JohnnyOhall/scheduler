// ----------------- EXTERNAL IMPORTS ----------------- //
import React from "react";

// ----------------- HELPER FUNCTIONS  ----------------- // 
import { 
  getAppointmentsForDay, 
  getInterview, 
  getInterviewersForDay 
} from "helpers/selectors";

// ----------------- COMPONENTS  ----------------- // 
import DayList from "./DayList";
import Appointment from "./Appointment";

// ----------------- HOOKS  ----------------- // 
import useApplicationData from "hooks/useApplicationData";

// ----------------- STYLING  ----------------- // 
import "components/Application.scss";


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