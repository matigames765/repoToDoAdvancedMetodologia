import { FC } from 'react'
import { ITarea } from '../../../types/ITarea'
import styles from './TaskCard.module.css'
import {Check, Eye, Pencil, Trash2} from 'lucide-react'
import { tareaStore } from '../../../stores/tareaStore'
import { sprintStore } from '../../../stores/sprintStore'
import { useTareas } from '../../../hooks/useTareas'
import { useSprints } from '../../../hooks/useSprints'
interface IPropsTaskCard{
  tarea: ITarea,
  handleOpenModalTaskProgress: () => void,
}
export const TaskCard: FC<IPropsTaskCard> = ({tarea, handleOpenModalTaskProgress}) => {

  const {editarSprintHook} = useSprints()

  const setSprintEnProgreso = sprintStore((state) => state.setSprintEnProgreso)

  const setTareaActiva = tareaStore((state) => state.setTareaActiva)
  const sprintEnProgreso = sprintStore((state) => state.sprintEnProgreso)

  const handleOpenModalEditTaskProgress = () => {
    handleOpenModalTaskProgress()
    setTareaActiva(tarea)
  }

  const handleDeleteTaskProgress = () => {
    if (sprintEnProgreso?.tareas) {
      const nuevasTareas = sprintEnProgreso.tareas.filter(el => el.id !== tarea.id);
  
      const nuevoSprint = { 
        ...sprintEnProgreso, 
        tareas: nuevasTareas 
      };
  
      setSprintEnProgreso(nuevoSprint); 
      editarSprintHook(nuevoSprint);    
    }
  }

  const handleChangeStatus = () => {
    if(sprintEnProgreso?.tareas){
      const index = sprintEnProgreso?.tareas.findIndex(el => el.id === tarea.id);
      if(sprintEnProgreso?.tareas[index].estado === "pendiente"){
        const nuevasTareas = sprintEnProgreso.tareas.map((el) =>
          el.id === tarea.id ? { ...el, estado: "en proceso" } : el
        );
        const nuevoSprint = { 
          ...sprintEnProgreso, 
          tareas: nuevasTareas 
        };
        setSprintEnProgreso(nuevoSprint)
        editarSprintHook(nuevoSprint)
      }else if(sprintEnProgreso?.tareas[index].estado === "en proceso"){
        const nuevasTareas = sprintEnProgreso.tareas.map((el) =>
          el.id === tarea.id ? { ...el, estado: "completada" } : el
        );
        const nuevoSprint = { 
          ...sprintEnProgreso, 
          tareas: nuevasTareas 
        };
        setSprintEnProgreso(nuevoSprint)
        editarSprintHook(nuevoSprint)
      }else{
        const nuevasTareas = sprintEnProgreso.tareas.filter(el => el.id !== tarea.id);
  
        const nuevoSprint = { 
          ...sprintEnProgreso, 
          tareas: nuevasTareas 
        };
  
        setSprintEnProgreso(nuevoSprint); 
        editarSprintHook(nuevoSprint);   
      }
    }
  }
  return (
    <div className={styles.containerTaskCard}>
      <div className={styles.contentTaskCard}>
        <p>Título: {tarea.titulo}</p>
        <p >Descripción: {tarea.descripcion}</p>
        <p >Fecha límite: {tarea.fechaLimite}</p>
        <div className={styles.buttonsTasks}>
          <button className={styles.buttonSentToBacklog}>Enviar a backlog</button>
          <button className={styles.buttonsHandleTasks}><Check size={20} color="black" onClick={handleChangeStatus}/></button>
          {/* <button className={styles.buttonsHandleTasks}><Eye size={20} color="black"/></button> */}
          <button className={styles.buttonsHandleTasks}><Pencil size={20} color="black" onClick={handleOpenModalEditTaskProgress}/></button>
          <button className={styles.buttonsHandleTasks}><Trash2 size={20} color="black" onClick={handleDeleteTaskProgress}/></button>
        </div>
      </div>
    </div>
  )
}
