/*
DAYLIST COMPONENT: USED TO POPULATE THE DATA INSIDE EACH DAY ON
  THE NAV BAR.
*/

import React from "react"; // EXTERNAL IMPORTS

import DayListItem from "./DayListItem"; // COMPONENT IMPORTS

export default function DayList( props ) {
  const listItem = props.days.map( day => {
    const { id, name, spots } = day,
      { value, onChange } = props;

    return (
      <DayListItem
        key={ id }
        name={ name } 
        spots={ spots } 
        selected={ name === value }
        setDay={ e => onChange( name ) }  
      />
    )
  })

  return <ul>{ listItem }</ul>;
}