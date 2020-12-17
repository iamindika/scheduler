import React from "react";

import "components/DayListItem.scss";

import classnames from "classnames";

export default function DayListItem(props) {
  const dayClass = classnames( 'day-list__item',
    {'day-list__item--selected': props.selected},
    {'day-list__item--full': props.spots === 0} );

  const spotsAvailable = props.spots > 1 ? 
    `${props.spots} spots remaining` :
    (props.spots === 0 ? 'no spots remaining' : `${props.spots} spot remaining`);


  return (
    <li className={dayClass} 
        onClick={() => props.setDay(props.name)}
        data-testid="day" >
        <h2>{props.name}</h2> 
        <h3>{spotsAvailable}</h3>
    </li>
  );
}