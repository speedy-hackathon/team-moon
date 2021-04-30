import React from "react";
import styles from "./styles.module.css";
import { MAX_HEIGHT, MAX_WIDTH } from "../../consts/sizes";

export default function Person({ person, onClick }) {
  const x = (person.position.x / MAX_WIDTH) * 100;
  const y = (person.position.y / MAX_HEIGHT) * 100;
  const clickHandle = (e) => {
    e.stopPropagation();
    onClick(person.id)
  }
  
 function getClassName(isInfected, isBoring, hasImmunity) {
    let className = `${styles.root}`
    if (isInfected && isBoring) {
      className += ` ${styles.boredAndInfected}`
      return className;
    }
    if (isInfected) {
      className += ` ${styles.infected}`
    }
    if (isBoring) {
      className += ` ${styles.bored}`
    }

    if (person.state === "Dead")
      return className += ` ${styles.dead}`
    return className
    
    if (hasImmunity) {
      className += ` ${styles.immunity}`
    }
    return className
  }
  
  return (
    <div
      className = {getClassName(person.infected, person.isBoring, person.hasImmunity)}
      style={{ left: `${x}%`, top: `${y}%` }}
      onClick={clickHandle}
    />
  );
}
