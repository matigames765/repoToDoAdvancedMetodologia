import { FC, useState } from "react";
import { ITarea } from "../../../types/ITarea";
import styles from "./TaskCardBacklog.module.css";
import { Pencil, Trash2 } from "lucide-react";
import { useTareas } from "../../../hooks/useTareas";
import { useSprints } from "../../../hooks/useSprints";
import { sprintStore } from "../../../stores/sprintStore";

interface ITaskCardBacklog {
  key: string,
  tarea: ITarea;
  handleOpenModalEdit: (tarea: ITarea) => void
}

export const TaskCardBacklog: FC<ITaskCardBacklog> = ({ tarea, handleOpenModalEdit }) => {

  const sprintEnProgreso = sprintStore((state) => state.sprintEnProgreso)
  const setSprintEnProgreso = sprintStore((state) => state.setSprintEnProgreso)
  const { editarSprintHook } = useSprints();

  const {sprints} = useSprints()

  const [sprintSeleccionado, setSprintSeleccionado] = useState<string>("")

  const {deleteTarea} = useTareas()

  const eliminarTareaById = () => {
    deleteTarea(tarea.id!, 0)
  }

  const editarTarea = () => {
    handleOpenModalEdit(tarea)
  }
  return (
    
      <div className={styles.containerTaskCard}>
        <div className={styles.tasksCardTitle}>
          <h2>{tarea.titulo}</h2>
        </div>
        <div className={styles.taskCardBody}>
          {/* Descripcion */}
          <p>{tarea.descripcion}</p>

          {/* ID */}
          <p>
            <b>ID:</b> {tarea.id}
          </p>
          {/* FECHA LIMITE */}
          <p>
            <b>fecha Limite: </b>
            {tarea.fechaLimite}
          </p>

          {/* BOTONES */}
          <div className={styles.buttonsContainer}>
          <select
            value={sprintSeleccionado}
            onChange={(e) => {
              const sprintId = e.target.value;
              setSprintSeleccionado(sprintId);

              const sprint = sprints.find(s => s.id === sprintId);
              if (!sprint) return;

              if(sprintEnProgreso?.id === sprintId){
                const nuevoSprintEnProgreso = {
                  ...sprintEnProgreso,
                  tareas: [...(sprintEnProgreso.tareas || []), tarea]
                };
                setSprintEnProgreso(nuevoSprintEnProgreso)
              }

              const nuevoSprint = {
                ...sprint,
                tareas: [...(sprint.tareas || []), tarea]
              };

              editarSprintHook(nuevoSprint, 1);  
              deleteTarea(tarea.id!, 1)
            }}
            className={styles.select}
          >
          <option value="">Selecciona un sprint</option>
          {sprints.map((sprint) => (
          <option key={sprint.id} value={sprint.id}>
            {sprint.nombre} 
          </option>
          ))}
          </select>
            <button className={styles.buttons} onClick={editarTarea}>
              <Pencil size={20} color="black" />
            </button>
            <button className={styles.buttons} onClick={eliminarTareaById}>
              <Trash2 size={20} color="black" />
            </button>
          </div>
        </div>
      </div>
  );
};
