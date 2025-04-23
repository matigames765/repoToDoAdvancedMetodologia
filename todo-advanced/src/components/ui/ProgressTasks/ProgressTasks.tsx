import { FC, useState } from 'react'
import { sprintStore } from '../../../stores/sprintStore'
import { TaskCard } from '../TaskCard/TaskCard'
import styles from './ProgressTasks.module.css'
import { ITarea } from '../../../types/ITarea'
import { tareaStore } from '../../../stores/tareaStore'


interface IPropsProgressTasks{
  handleOpenModalTaskProgress: () => void
}

export const ProgressTasks: FC<IPropsProgressTasks> = ({handleOpenModalTaskProgress}) => {

  const sprintEnProgreso = sprintStore((state) => state.sprintEnProgreso);

  const setTareaActiva = tareaStore((state) => state.setTareaActiva)

  const arrayTareasPendientes: ITarea[] = sprintEnProgreso?.tareas?.filter(t => t.estado === "pendiente") || [];
  const arrayTareasEnProgreso: ITarea[] = sprintEnProgreso?.tareas?.filter(t => t.estado === "en proceso") || [];
  const arrayTareasCompletadas: ITarea[] = sprintEnProgreso?.tareas?.filter(t => t.estado === "completada") || [];

  
  return (
    <>
      <div className={styles.containerProgressTasks}>
        <div className={styles.containerHeaderProgressTasks}>
          <h3 className={styles.taskInSprintTitle}>Tareas en la sprint</h3>
          <h3 className={styles.nameSprintTitle}>
            Nombre de la sprint: {sprintEnProgreso?.nombre}
          </h3>
          <button
            className={styles.buttonCreateTask}
            onClick={handleOpenModalTaskProgress}
          >
            Crear tarea
          </button>
        </div>
        <div className={styles.containerStatusTasks}>
          <div className={styles.containerPending}>
            <div className={styles.containerInsidePending}>
              <h1>Pendiente</h1>
              <div className={styles.containerTasksStatus}>
              {arrayTareasPendientes.length > 0 ? 
                arrayTareasPendientes.map((tarea) => <TaskCard key={tarea.id} tarea={tarea} handleOpenModalTaskProgress={handleOpenModalTaskProgress}/>) : 
                <h3>No hay tareas pendientes</h3>
              }
              </div>
            </div>
          </div>
          <div className={styles.containerInProgress}>
            <div className={styles.containerInProgressInside}>
              <h1>En Progreso</h1>
              <div className={styles.containerTasksStatus}>
              {arrayTareasEnProgreso.length > 0 ? 
                arrayTareasEnProgreso.map((tarea) => <TaskCard key={tarea.id} tarea={tarea} handleOpenModalTaskProgress={handleOpenModalTaskProgress}/>) : 
                <h3>No hay tareas en progreso</h3>
              }
              </div>
            </div>
          </div>
          <div className={styles.containerFinished}>
            <div className={styles.containerFinishedInside}>
              <h1>Completado</h1>
              <div className={styles.containerTasksStatus}>
              {arrayTareasCompletadas.length > 0 ? 
                arrayTareasCompletadas.map((tarea) => <TaskCard key={tarea.id} tarea={tarea} handleOpenModalTaskProgress={handleOpenModalTaskProgress}/>) : 
                <h3>No hay tareas completadas</h3>
              }
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

// export const ProgressTasks: FC<IPropsProgressTasks> = ({handleOpenModalTaskProgress}) => {
//   const sprintEnProgreso = sprintStore((state) => state.sprintEnProgreso)
//   return (
//     <div className={styles.containerProgressTasks}>
//       <div className={styles.containerHeaderProgressTasks}>
//         <h3 className={styles.taskInSprintTitle}>Tareas en la sprint</h3>
//         <h3 className={styles.nameSprintTitle}>Nombre de la sprint: {sprintEnProgreso?.nombre}</h3>
//         <button className={styles.buttonCreateTask} onClick={handleOpenModalTaskProgress}>Crear tarea</button>
//       </div>
//       <div className={styles.containerStatusTasks}>
//         <div className={styles.containerPending}>
//           <div className={styles.containerInsidePending}>
//             <h1>Pendiente</h1>
//             <TaskCard /> 
//           </div>
//         </div>
//         <div className={styles.containerInProgress}>
//           <h1>En Progreso</h1>
//         </div>
//         <div className={styles.containerFinished}>
//           <h1>Completado</h1>
//         </div>
//       </div>
//       </div>
//   )
// }
