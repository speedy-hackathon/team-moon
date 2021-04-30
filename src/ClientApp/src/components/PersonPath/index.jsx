import styles from "./style.module.css";
import {MAX_WIDTH} from "../../consts/sizes";

export const PersonPath = ({path}) => {
    const pathToString = (path) => path.map(({x, y}) => {
        const x1 = (x / MAX_WIDTH) * 100;
        const y1 = (y / MAX_WIDTH) * 100
        return `${x1},${y1}`
    }).join(' ')

    return (
        <svg className={styles.svg}>
            <path d={"M" + pathToString(path)} className={styles.path} stroke="black" />
        </svg>
    );
}