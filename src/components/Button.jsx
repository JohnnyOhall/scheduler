/*
BUTTON COMPONENT: BUTTONS USED THROUGHOUT THE VIEWS
*/

// -------------- EXTERNAL IMPORTS -------------- //
import React from "react";
import classNames from "classnames";

import "components/Button.scss"; // STYLING IMPORTS

export default function Button( props ) {
   const { onClick, disabled, children, confirm, danger } = props;

   const buttonClass = classNames( "button", {
      "button--confirm": confirm,
      "button--danger": danger
    });
 
   return (
      <button 
         className={ buttonClass } 
         onClick={ onClick } 
         disabled={ disabled }
      >
         { children }
      </button>
   );
};