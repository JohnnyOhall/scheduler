/*
DAY LIST ITEM COMPONENT: USED TO POPULATE THE DATA IN THE NAV BAR.
*/

// ------------ EXTERNAL IMPORTS ------------- //
import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss"; // STYLE IMPORTS

export default function DayListItem( props ) {
  const { spots, setDay, selected, name } = props;

  const dayClass = classNames( "day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots
  });
  
  const formatSpots = () => {
    let output = `${ spots } spots remaining`

    spots === 1 && ( output = `${ spots } spot remaining` );
    spots <= 0 && ( output = `no spots remaining` );

    return output;
  }; // USED TO DISPLAY CORRECT TEXT STRING BASED ON SPOTS REMAINING

  return (
    <li 
      className={ dayClass } 
      onClick={ setDay } 
      selected={ selected } 
      data-testid="day"
    >
      <h2 className="text--regular">{ name }</h2>
      <h3 className="text--light">{ formatSpots( ) }</h3>
    </li>
  );
};