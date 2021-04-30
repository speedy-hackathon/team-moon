import React from "react";
import styles from "./styles.module.css";
import Person from "../Person";
import House from "../House";
import { PersonPath } from "../PersonPath";

export default function Field({ map, people, onClick,  onFieldClick, activePerson }) {
  return (
    <div className={styles.root} onClick={onFieldClick}>
      {
        activePerson &&
        <PersonPath path={activePerson.pathFromSimStart}/>
      } 
      {map.map((item, i) => (
        <House key={i} x={item.x} y={item.y} />
      ))}
      {people.map((item) => (
        <Person person={item} key={item.id} onClick={onClick} />
      ))}
    </div>
  );
}
