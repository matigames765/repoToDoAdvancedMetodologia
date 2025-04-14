import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useTareas } from "../../../hooks/useTareas";
import { ITarea } from "../../../types/ITarea";
import { ColumnSprints } from "../../ui/ColumnSprints/ColumnSprints";
import { ProgressTasks } from "../../ui/ProgressTasks/ProgressTasks";
import { Header } from "../../ui/Header/Header";
import styles from "./SprintTasksScreen.module.css";
export const SprintTasksScreen = () => {
  const { id } = useParams<{ id: string }>();
  const { tareas } = useTareas();
  const [tareasSprint, setTareasSprint] = useState<ITarea[]>([]);

  useEffect(() => {
    if (id) {
      const tareasFilter = tareas.filter((tarea) => tarea.sprintId === id);
      setTareasSprint(tareasFilter);
    }
  }, [id, tareas]);

  return (
    <div>
      <Header />
      <div className={styles.containerMain}>
        <ColumnSprints texto="Backlog" link="backlog" />

        <ProgressTasks tareasSprint={tareasSprint} idSprint={id} />
      </div>
    </div>
  );
};
