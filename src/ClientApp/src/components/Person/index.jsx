import React from "react";
import styles from "./styles.module.css";
import { MAX_HEIGHT, MAX_WIDTH } from "../../consts/sizes";

export default function Person({ person, onClick }) {
  const x = (person.position.x / MAX_WIDTH) * 100;
  const y = (person.position.y / MAX_HEIGHT) * 100;

  //const red = Math.floor(Math.random() * 256);
  const red = person.id * 10 % 256; 
  const green = person.id * 20 % 256;
  const blue = person.id * 80 % 256;


  const borderThickness = person.id % 2 + 1;
  const borderTypeIndex = person.id % 3;
  const borderTypes = ['solid', 'dotted', 'dashed']

  function getClassName(isInfected, isBoring) {
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
    return className
  }
  return (
    <div
      className = {getClassName(person.infected, person.isBoring)}
      style={{ left: `${x}%`, top: `${y}%`, border:`${borderThickness}px ${borderTypes[borderTypeIndex]} rgb(${red},${green},${blue})` }}
      onClick={() => onClick(person.id)}
    />
  );
}
