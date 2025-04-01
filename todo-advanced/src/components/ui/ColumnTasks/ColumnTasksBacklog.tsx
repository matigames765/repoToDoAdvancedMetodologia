import { useEffect, useState } from "react";
import styles from "./ColumnTasksBacklog.tsx.module.css";
import { ModalTask } from "../ModalTask/ModalTask";
import { useTareas } from "../../../hooks/useTareas";
export const ColumnTasks = () => {

  const {getTareas, tareas} = useTareas()

  useEffect(() => {
    getTareas()
  }, [])

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
        {/* {tareas.length > 0 ?
        tareas.map((elemento) => <TaskCard tarea={elemento} />):
        <h3>No hay tareas</h3>
      } */}
      </div>
    </div>
    {openModalTask && <ModalTask handleCloseModal={handleCloseModal}/>}</>
  );
};
