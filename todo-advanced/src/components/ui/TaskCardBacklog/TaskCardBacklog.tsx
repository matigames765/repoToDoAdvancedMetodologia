import { FC } from "react";
import { ITarea } from "../../../types/ITarea";
import styles from "./TaskCardBacklog.module.css";
import { Pencil, Trash2 } from "lucide-react";

interface ITaskCardBacklog {
  tarea: ITarea;
}

export const TaskCardBacklog: FC<ITaskCardBacklog> = ({ tarea }) => {
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

          {/* ESTADO */}
          <p>
            <b>estado: </b>
            {tarea.estado}
          </p>

          {/* FECHA LIMITE */}
          <p>
            <b>fecha Limite: </b>
            {tarea.fechaLimite}
          </p>

          {/* BOTONES */}
          <div className={styles.buttonsContainer}>
            <button className={styles.buttons}>
              <Pencil size={20} color="black" />
            </button>
            <button className={styles.buttons}>
              <Trash2 size={20} color="black" />
            </button>
          </div>
        </div>
      </div>
  );
};
