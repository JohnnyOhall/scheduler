import React from "react"; //We are rendering `<Application />` down below, so we need React.createElement

// We import our helper functions from the react-testing-library The render function allows us to render Components
import { render } from "@testing-library/react"; //We import the component that we are testing
import Appointment from "components/Appointment";

// it === test & to skip its either xit || skip.test
xit("renders without crashing", () => { //A test that renders a React Component
  render( <Appointment /> );
});