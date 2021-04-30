import React from "react";
import styles from "./styles.module.css";
import { MAX_HEIGHT, MAX_WIDTH } from "../../consts/sizes";
import { AT_HOME, GOING_HOME, WALKING } from "../../consts/playerStates";


export default function Person({ person, onClick }) {
  const x = (person.position.x / MAX_WIDTH) * 100;
  const y = (person.position.y / MAX_HEIGHT) * 100;
  return (
    <div
      className={`${styles.root} ${getStateStyle(person.state)}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      onClick={() => onClick(person.id)}
    />
  );
}


function getStateStyle(state){
  switch(state){
    case AT_HOME:
      return styles.atHome
    case WALKING:
      return styles.walking
    case GOING_HOME:
      return styles.goingHome
    default:
      return ''
  }
}