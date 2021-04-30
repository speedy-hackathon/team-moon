import styles from "./style.module.css";

export const PersonPath = ({path}) => {
    const pathToString = (path) => path.map(({x, y}) => `${x},${y}`).join(' ')

    return (
        <svg className={styles.svg}>
            <path d={"M" + pathToString(path)} className={styles.path} stroke="black" />
        </svg>
    );
}