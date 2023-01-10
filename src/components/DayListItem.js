import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });
  
  const formatSpots = input => {
    let output = `${input} spots remaining`

    input === 1 && (output = `${input} spot remaining`);
    input <= 0 && (output = `no spots remaining`);

    return output
  }

  const daysLeftText = formatSpots(props.spots)

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name) }>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{daysLeftText}</h3>
    </li>
  );
}