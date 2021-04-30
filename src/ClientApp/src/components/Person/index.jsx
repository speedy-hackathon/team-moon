import React from "react";
import styles from "./styles.module.css";
import {MAX_HEIGHT, MAX_WIDTH} from "../../consts/sizes";
import {personPositionUrl} from "../../consts/urls";
import errorHandler from "../../utils/errorHandler";

const FIELD_WIDTH = 1000;
const FIELD_HEIGHT = 500;

export default function Person({person, onClick, offsets, isGodMode}) {
  let x = (person.position.x / MAX_WIDTH) * 100;
  let y = (person.position.y / MAX_HEIGHT) * 100;

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

    if (hasImmunity) {
      className += ` ${styles.immunity}`
    }
    return className


  }
  const onDragEnd = (e) => {
    if (isGodMode && offsets && offsets.length) {
      const [offsetX, offsetY, width, height] = offsets;
      const targetX = (e.pageX - offsetX) * FIELD_WIDTH / width;
      const targetY = (e.pageY - offsetY ) * FIELD_HEIGHT / height;

      x = (targetX / MAX_WIDTH) * 100;
      y = (targetY / MAX_HEIGHT) * 100;

      person.position = {x: parseInt(targetX), y: parseInt(targetY)};
      setNewPersonPosition(person);
    }
  };

  const setNewPersonPosition = (person) => {
    fetch(`${personPositionUrl}${person.id}`,
        {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(person.position)
        })
        .then(errorHandler)
        .then(() => person.isFrozen = false)
  };

  return (
    <div
        className = {getClassName(person.infected, person.isBoring, person.hasImmunity)}
        draggable={isGodMode}
        onDragEnd={onDragEnd}
        style={{left: `${x}%`, top: `${y}%`}}
        onClick={clickHandle}
    />
  );
}
