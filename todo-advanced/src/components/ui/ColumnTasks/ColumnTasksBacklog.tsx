import styles from "./ColumnTasksBacklog.tsx.module.css";
export const ColumnTasks = () => {
  return (
    <div className={styles.containerPrincipalColumnTasks}>
      <div className={styles.containerTasksBacklog}>
        <h2>Backlog</h2>
      </div>
      <div className={styles.headerBacklog}>
        <h3>Tareas</h3>

        <button className={styles.buttonAddTask}> añadir tarea +</button>
      </div>
      <div className={styles.tasks}>

      </div>
    </div>
  );
};
