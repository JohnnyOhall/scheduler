/*
CONFIRM COMPONENT: THIS COMPONENT IS USED TO CONFIRM A DELETION REQUEST
*/

import React from "react"; // EXTERNAL IMPORTS

import Button from "components/Button"; // COMPONENT IMPORTS

export default function Confirm( props ) {
  const { message, onConfirm, onCancel } = props;

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{ message }</h1>
      <section className="appointment__actions">
        <Button onClick={ onCancel } danger>Cancel</Button>
        <Button onClick={ onConfirm } danger>Confirm</Button>
      </section>
    </main>
  );
};