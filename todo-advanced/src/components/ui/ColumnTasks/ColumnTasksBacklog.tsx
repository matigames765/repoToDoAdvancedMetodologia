import { useState } from "react";
import styles from "./ColumnTasksBacklog.tsx.module.css";
import { ModalTask } from "../ModalTask/ModalTask";
export const ColumnTasks = () => {

  const [openModalTask, setOpenModalTask] = useState(false)

  const handleCloseModal = () => {
    setOpenModalTask(false)
  }
  return (
    <>
    <div className={styles.containerPrincipalColumnTasks}>
      <div className={styles.containerTasksBacklog}>
        <h2>Backlog</h2>
      </div>
      <div className={styles.headerBacklog}>
        <h3>Tareas</h3>

        <button className={styles.buttonAddTask} onClick={() => {
          setOpenModalTask(true)
        }}> añadir tarea +</button>
      </div>
      <div className={styles.tasks}>

      </div>
    </div>
    {openModalTask && <ModalTask handleCloseModal={handleCloseModal}/>}</>
  );
};
