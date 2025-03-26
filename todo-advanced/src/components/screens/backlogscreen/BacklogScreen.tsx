import { ColumnSprints } from "../../ui/ColumnSprints/ColumnSprints";
import { ColumnTasks } from "../../ui/ColumnTasks/ColumnTasksBacklog";
import { HeaderBacklog } from "../../ui/HeaderBacklog/HeaderBacklog";
import styles from "./BacklogScreen.module.css";

export const BacklogScreen = () => {
  return (
    <div className={styles.containerBacklogScreen}>
      <HeaderBacklog />

      <div className={styles.containerMain}>
        <ColumnSprints />
        <ColumnTasks />
      </div>
    </div>
  );
};
