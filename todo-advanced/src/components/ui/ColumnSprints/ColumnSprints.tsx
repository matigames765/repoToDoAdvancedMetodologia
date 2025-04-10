import { FC, useState } from "react";
import { CardSprints } from "../CardSprints/CardSprints";
import styles from "./ColumnSprints.module.css";
import { Link } from "react-router";
import { Plus } from "lucide-react";
import { ModalSprints } from "../ModalSprints/ModalSprints";

interface IColumnSprints {
  texto: string;
  link: string;
}

export const ColumnSprints: FC<IColumnSprints> = ({ texto, link }) => {

  const [openModalSprints, setOpenModalSprints] = useState<boolean>(true)

  
  return (
    <>
    <div className={styles.containerColumnSprints}>
      <Link to={link} className={styles.buttonVolverColumnSprints}>
        {texto}
      </Link>
      <div className={styles.containerTitleAddSprint}>
        <h2>Sprints</h2>
        <button className={styles.buttonAddSprint} onClick={() => {
          setOpenModalSprints(true)
          }}><Plus size={20} color="black" /></button>
      </div>
      <CardSprints />
    </div>
    {openModalSprints && <ModalSprints />}
    </>
  );
};
