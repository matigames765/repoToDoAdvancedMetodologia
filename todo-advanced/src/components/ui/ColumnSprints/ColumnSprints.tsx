import { FC, useEffect, useState } from "react";
import { CardSprints } from "../CardSprints/CardSprints";
import styles from "./ColumnSprints.module.css";
import { Link } from "react-router";
import { Plus } from "lucide-react";
import { ModalSprints } from "../ModalSprints/ModalSprints";
import { getAllTareasController } from "../../../data/tasksController";
import { useSprints } from "../../../hooks/useSprints";

interface IColumnSprints {
  texto: string;
  link: string;
}

export const ColumnSprints: FC<IColumnSprints> = ({ texto, link }) => {

  const [openModalSprints, setOpenModalSprints] = useState<boolean>(false)

  const {sprints, getSprintsHook} = useSprints()

  const handleCloseModal = () => {
    setOpenModalSprints(false)
  }

  useEffect(() => {
    getSprintsHook()
  }, [])

  
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
      {
        sprints.length > 0 ?
        sprints.map((sprint) => <CardSprints key={sprint.id!} sprint = {sprint}/>) : 
        <h3>No hay sprints</h3>
      }
    </div>
    {openModalSprints && <ModalSprints handleCloseModal={handleCloseModal}/>}
    </>
  );
};
