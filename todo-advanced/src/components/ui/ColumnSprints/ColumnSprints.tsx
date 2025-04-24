import { FC, useEffect, useState } from "react";
import { CardSprints } from "../CardSprints/CardSprints";
import styles from "./ColumnSprints.module.css";
import { Link } from "react-router";
import { Plus } from "lucide-react";
import { ModalSprints } from "../ModalSprints/ModalSprints";
import { useSprints } from "../../../hooks/useSprints";
import { sprintStore } from "../../../stores/sprintStore";
import { ISprint } from "../../../types/ISprint";

interface IColumnSprints {
  texto: string;
  link: string;
}

export const ColumnSprints: FC<IColumnSprints> = ({ texto, link }) => {

  

  const setSprintActivo = sprintStore((state) => state.setSprintActivo)

  const [openModalSprints, setOpenModalSprints] = useState<boolean>(false)

  const {sprints, getSprintsHook} = useSprints()

  const handleCloseModal = () => {
    setSprintActivo(null)
    setOpenModalSprints(false)
  }

  const handleOpenModalEdit = (sprint: ISprint) => {
    setOpenModalSprints(true)
    setSprintActivo(sprint)
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
      <div className={styles.sprints}>
      {
        sprints.length > 0 ?
        sprints.map((sprint) => <CardSprints key={sprint.id!} sprint = {sprint} handleOpenModalEdit = {handleOpenModalEdit}/>) : 
        <h3>No hay sprints</h3>
      }
      </div>
    </div>
    {openModalSprints && <ModalSprints handleCloseModal={handleCloseModal}/>}
    </>
  );
};
