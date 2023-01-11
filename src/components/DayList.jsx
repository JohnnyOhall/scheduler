import React from "react";
import DayListItem from "./DayListItem";

export default function DayList( props ) {
  const listItem = props.days.map( i => {
    const { id, name, spots } = i,
      { day, setDay } = props;

    return (
      <DayListItem
        key={ id }
        name={ name } 
        spots={ spots } 
        selected={ name === day }
        setDay={ e => setDay( name ) }  
      />
    )
  })

  return <ul>{listItem}</ul>;
}