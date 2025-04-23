import { useEffect, useState } from "react";
import styles from "./ColumnTasksBacklog.tsx.module.css";
import { ModalTask } from "../ModalTask/ModalTask";
import { useTareas } from "../../../hooks/useTareas";
import { TaskCardBacklog } from "../TaskCardBacklog/TaskCardBacklog";
import { ITarea } from "../../../types/ITarea";
import { tareaStore } from "../../../stores/tareaStore";

export const ColumnTasks = () => {

  const setTareaActiva = tareaStore((state) => state.setTareaActiva)

  const {getTareas, tareas} = useTareas()

  useEffect(() => {
    getTareas()
  }, [])

  const [openModalTask, setOpenModalTask] = useState(false)

  const handleCloseModal = () => {
    setTareaActiva(null)
    setOpenModalTask(false);
  };

  const handleOpenModalEdit = (tarea: ITarea) => {
    setTareaActiva(tarea)
    setOpenModalTask(true)
  }
  return (
    <>
      <div className={styles.containerPrincipalColumnTasks}>
        <div className={styles.containerTasksBacklog}>
          <h2>Backlog</h2>
        </div>
        <div className={styles.headerBacklog}>
          <h3>Tareas</h3>

          <button
            className={styles.buttonAddTask}
            onClick={() => {
              setOpenModalTask(true);
            }}
          >
            {" "}
            añadir tarea +
          </button>
        </div>
        <div className={styles.tasks}>
          {tareas.length > 0 ?
          tareas.map((el) => <TaskCardBacklog key={el.id!} tarea={el} handleOpenModalEdit={handleOpenModalEdit}/>):
          <h3>No hay tareas</h3>}
        </div>
      </div>
      {openModalTask && <ModalTask handleCloseModal={handleCloseModal} />}
    </>
  );
};
