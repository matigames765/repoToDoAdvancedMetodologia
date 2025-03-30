import { ColumnSprints } from "../../ui/ColumnSprints/ColumnSprints";
import { Header } from "../../ui/Header/Header";
import { ProgressTasks } from "../../ui/ProgressTasks/ProgressTasks";
import styles from "./TareasScreen.module.css";

export const TareasScreen = () => {
  return (
    <div>
      <Header />
      <div className={styles.containerMain}>
        <ColumnSprints texto="Backlog" />
        <ProgressTasks />
      </div>
    </div>
  );
};
