import { TaskCard } from '../TaskCard/TaskCard'
import styles from './ProgressTasks.module.css'


export const ProgressTasks = () => {
  return (
    <div className={styles.containerProgressTasks}>
      <div className={styles.containerHeaderProgressTasks}>
        <h3 className={styles.taskInSprintTitle}>Tareas en la sprint</h3>
        <h3 className={styles.nameSprintTitle}>Nombre de la sprint: sprint 1</h3>
        <button className={styles.buttonCreateTask}>Crear tarea</button>
      </div>
      <div className={styles.containerStatusTasks}>
        <div className={styles.containerPending}>
          <div className={styles.containerInsidePending}>
            <h1>Pendiente</h1>
            <TaskCard /> 
          </div>
        </div>
        <div className={styles.containerInProgress}>
          <h1>En Progreso</h1>
        </div>
        <div className={styles.containerFinished}>
          <h1>Completado</h1>
        </div>
      </div>
      </div>
  )
}
