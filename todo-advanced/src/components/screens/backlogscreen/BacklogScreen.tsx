import { ColumnSprints} from "../../ui/ColumnSprints/ColumnSprints";
import { ColumnTasks } from "../../ui/ColumnTasks/ColumnTasksBacklog";
import { Header } from "../../ui/Header/Header";
import styles from "./BacklogScreen.module.css";

export const BacklogScreen = () => {
  return (
    <div className={styles.containerBacklogScreen}>
      <Header />

      <div className={styles.containerMain}>
        <ColumnSprints texto="Volver" link="/" />
        <ColumnTasks />
      </div>
    </div>
  );
};
