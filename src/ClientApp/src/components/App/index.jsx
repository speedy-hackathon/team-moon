import React from "react";
import styles from "./style.module.css";
import Field from "../Field";
import { DELAY, MAX_HEIGHT, MAX_WIDTH } from "../../consts/sizes";
import { gameStateUrl, userActionUrl, resetActivePerson } from "../../consts/urls";
import errorHandler from "../../utils/errorHandler";
import Instruction from "../Instruction";

import "./base.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      people: [],
      map: [],
      activePerson: null,
      instructionOpen: true,
    };
    this.intervalId = null;
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  render() {
    const { people, map, instructionOpen, activePerson } = this.state;
    return (
      <div className={styles.root}>
        {instructionOpen && <Instruction onClose={this.closeInstruction} />}
        <h1 className={styles.title}>Симулятор COVID</h1>
        <Field map={map} people={people} activePerson={activePerson} onFiledClick={this.fieldClick} onClick={this.personClick} />
      </div>
    );
  }

  closeInstruction = () => {
    this.setState({
      instructionOpen: false,
    });

    this.getNewStateFromServer();

    this.intervalId = setInterval(this.getNewStateFromServer, DELAY);
  };

  personClick = (id) => {
    fetch(userActionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personClicked: id,
      }),
    }).then(errorHandler);
  };

  fieldClick = () => {
    const {activePerson} = this.state;
    if(activePerson) {
      fetch(resetActivePerson, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(errorHandler);
    }
  };

  getNewStateFromServer = () => {
    fetch(gameStateUrl)
      .then(errorHandler)
      .then((res) => res.json())
      .then((game) => {
        this.setState({
          people: game.people,
          map: game.map.houses.map((i) => i.coordinates.leftTopCorner),
          activePerson: game.activePerson
        });
      });
  };
}
