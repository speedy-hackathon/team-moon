import React, {useEffect, useRef, useState} from "react";
import styles from "./styles.module.css";
import Person from "../Person";
import House from "../House";
import { PersonPath } from "../PersonPath";

export default function Field({ map, people, onClick,  onFieldClick, activePerson }) {
  const [offsets, setOffsets] = useState(null);
  const [isGodMode, setGodMode] = useState(false);
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current;
    const {width, height} = el.getBoundingClientRect();

    setOffsets([
      el.offsetLeft,
      el.offsetTop,
      width,
      height,
    ])
  });

  const onGodModeChange = (event) => {
    setGodMode(event.target.checked)
  };

  return (
    <>
      <div className={styles.controls}>
        <input type='checkbox' id='godMode' onClick={onGodModeChange}/>
        <label htmlFor='godMode'>Режим Бога</label>
      </div>

      <div className={styles.root} ref={el => containerRef.current = el} onClick={onFieldClick}>
        {
          activePerson &&
          <PersonPath path={activePerson.pathFromSimStart}/>
        }
        {map.map((item, i) => (
            <House key={i} x={item.x} y={item.y}/>
        ))}
        {people.map((item) => (
            <Person person={item} key={item.id} onClick={onClick} offsets={offsets} isGodMode={isGodMode}/>
        ))}
      </div>
    </>
  );
}
