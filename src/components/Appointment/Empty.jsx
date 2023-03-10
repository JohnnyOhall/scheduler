/*
EMPTY COMPONENT: THIS COMPONENT DISPLAYS AN ADD BUTTON (+) FOR BOOKING A
  NEW APPOINTMENT ON AN EMPTY TIME-SLOT
*/

import React from "react"; // EXTERNAL IMPORTS

export default function Empty( props ) {
  const { onAdd } = props;

  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={ onAdd }
      />
    </main>
  );
};