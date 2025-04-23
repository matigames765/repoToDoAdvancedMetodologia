import { useLocation } from "react-router";
import { ColumnSprints} from "../../ui/ColumnSprints/ColumnSprints";
import { ColumnTasks } from "../../ui/ColumnTasks/ColumnTasksBacklog";
import { Header } from "../../ui/Header/Header";
import styles from "./BacklogScreen.module.css";
import { useTareas } from "../../../hooks/useTareas";
import { useEffect } from "react";

export const BacklogScreen = () => {
  const location = useLocation()
  const tareaDePantallaSprint = location.state?.tareaEnviada

  const {getTareas} = useTareas()

  useEffect(() => {
    getTareas()
  }, [tareaDePantallaSprint])
  
  return (
    <div className={styles.containerBacklogScreen}>
      <Header />

      <div className={styles.containerMain}>
        <ColumnSprints texto="Volver" link="/" />
        <ColumnTasks/>
      </div>
    </div>
  );
};
