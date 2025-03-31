import { FC } from "react";
import { CardSprints } from "../CardSprints/CardSprints";
import styles from "./ColumnSprints.module.css";
import { Link } from "react-router";

interface IColumnSprints {
  texto: string;
  link: string;
}

export const ColumnSprints: FC<IColumnSprints> = ({ texto, link }) => {
  return (
    <div className={styles.containerColumnSprints}>
      <Link to={link} className={styles.buttonVolverColumnSprints}>
        {texto}
      </Link>
      <h2>Sprints</h2>
      <CardSprints />
    </div>
  );
};
