/*
ERROR COMPONENT: THIS COMPONENT IS USED TO DISPLAY WHEN AN ERROR IS
  RECIEVED DURING A DELETE OR EDIT OR ADD.
*/

import React from "react"; // EXTERNAL IMPORTS

export default function Error( props ) {
  const { message, onClose, type } = props;

  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">{ type }</h1>
        <h3 className="text--light">{ message }</h3>
      </section>
      <img
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
        onClick={ onClose }
      />
    </main>
  );
};