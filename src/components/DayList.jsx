import React from "react";
import DayListItem from "./DayListItem";

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

  return <ul>{listItem}</ul>;
}