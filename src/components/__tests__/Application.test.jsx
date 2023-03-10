import React from "react";
import axios from "axios";

import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";
import { getByText,/* prettyDOM, */getAllByTestId, getByAltText } from "@testing-library/react";
import { getByPlaceholderText, queryByText, getByDisplayValue } from "@testing-library/react";

import Application from "components/Application";


afterEach( cleanup );


describe( "Application", () => {
  it( "defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render( <Application /> );

    await waitForElement( () => getByText( "Monday" ) );

    fireEvent.click( getByText( "Tuesday" ) );

    expect( getByText( "Leopold Silvers" ) ).toBeInTheDocument( );
  });


  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render( <Application /> );

    await waitForElement( () => getByText( container, "Archie Cohen" ) );

    const appointments = getAllByTestId( container, "appointment" );
    const appointment = appointments[ 0 ]

    fireEvent.click( getByAltText( appointment, "Add" ) );

    fireEvent.change( getByPlaceholderText( appointment, /enter student name/i ), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click( getByAltText( appointment, "Sylvia Palmer" ) );

    fireEvent.click( getByText( appointment, "Save" ) );
    
    expect( getByText( appointment, "Saving" ) ).toBeInTheDocument( );

    await waitForElement( () => getByText( appointment, "Lydia Miller-Jones") );

    const day = getAllByTestId( container, "day" ).find( day =>
      queryByText( day, "Monday" )
    );
    
    expect( getByText( day, "no spots remaining" ) ).toBeInTheDocument( );
  });


  it( "loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render( <Application /> );
    
    await waitForElement( () => getByText( container, "Archie Cohen" ) );
  
    const appointment = getAllByTestId( container, "appointment" ).find(
      appointment => queryByText( appointment, "Archie Cohen" )
    );

    fireEvent.click( getByAltText( appointment, "Delete" ) );
   
    expect( getByText( appointment, "Are you sure you'd like to delete?" ) ).toBeInTheDocument( );
   
    fireEvent.click( getByText( appointment, "Confirm" ) );
    
    expect( getByText( appointment, "Removing" ) ).toBeInTheDocument( );

    await waitForElement( () => getByAltText( appointment, "Add" ) );

    const day = getAllByTestId( container, "day" ).find( day =>
      queryByText( day, "Monday" )
    );
     
    expect( getByText( day, "2 spots remaining" ) ).toBeInTheDocument( );
  });


  
  it( "loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render( <Application /> );

    await waitForElement( () => getByText( container, "Archie Cohen" ) );

    const appointment = getAllByTestId( container, "appointment" ).find(
      appointment => queryByText( appointment, "Archie Cohen" )
    );

    fireEvent.click( getByAltText( appointment, "Edit" ) );

    fireEvent.change( getByDisplayValue( appointment, "Archie Cohen" ), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click( getByText( appointment, "Save" ) );

    expect( getByText( appointment, "Saving" ) ).toBeInTheDocument( );

    await waitForElement( () => getByText( appointment, "Lydia Miller-Jones" ) );

    expect( getByText( appointment, "Lydia Miller-Jones" ) ).toBeInTheDocument( );
  });


  // COMMENT OUT LINES 39-42 of src/components/Appointments/index.jsx before running test
  xit( "shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce( );

    const { container } = render( <Application /> );

    await waitForElement( () => getByText( container, "Archie Cohen" ) );

    const appointments = getAllByTestId( container, "appointment" );
    const appointment = appointments[ 0 ];

    fireEvent.click( getByAltText( appointment, "Add" ) );

    fireEvent.change( getByPlaceholderText( appointment, /enter student name/i ), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click( getByAltText( appointment, "Sylvia Palmer" ) );

    fireEvent.click( getByText( appointment, "Save" ) );
    
    expect( getByText( appointment, "Saving" ) ).toBeInTheDocument( );

    await waitForElement( () => getByText( appointment, "ERROR SAVING" ) );
    
    expect( getByText( appointment, "ERROR SAVING" ) ).toBeInTheDocument( );
  });

  // IMPORTANT: Comment out lines 52-54 of src/components/Appointments/index.jsx before running test
  xit( "shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce( );
    
    const { container } = render( <Application /> );

    await waitForElement( () => getByText( container, "Archie Cohen" ) );

    const appointment = getAllByTestId( container, "appointment" ).find(
      appointment => queryByText( appointment, "Archie Cohen" )
    );

    fireEvent.click( getByAltText(appointment, "Delete" ) );
  
    expect( getByText( appointment, "Are you sure you'd like to delete?" ) ).toBeInTheDocument( );

    fireEvent.click( getByText( appointment, "Confirm" ) );

    expect( getByText( appointment, "Removing" ) ).toBeInTheDocument( );
  
    await waitForElement( () => getByText( appointment, "ERROR DELETING" ) );
    
    expect( getByText( appointment, "ERROR DELETING" ) ).toBeInTheDocument( );
  });
});