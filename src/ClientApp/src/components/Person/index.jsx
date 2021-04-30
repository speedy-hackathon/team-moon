import React from "react";
import styles from "./styles.module.css";
import { MAX_HEIGHT, MAX_WIDTH } from "../../consts/sizes";


  class Border {
    constructor(id) {
    this.red = id * 10 % 256; 
    this.blue = id * 100 % 256;
    this.green = id * 50 % 256;

    this.borderThickness = id % 3 + 2;
    this.borderTypeIndex = id % 3;
    this.borderTypes = ['solid', 'dotted', 'dashed']
    }

    getBorder=()=> {
      return `${this.borderThickness}px ${this.borderTypes[this.borderTypeIndex]} rgb(${this.red},${this.green},${this.blue})`
    }
  }

export default function Person({ person, onClick }) {

  const x = (person.position.x / MAX_WIDTH) * 100;
  const y = (person.position.y / MAX_HEIGHT) * 100;

  const border = `${new Border(person.id).getBorder()}`
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
