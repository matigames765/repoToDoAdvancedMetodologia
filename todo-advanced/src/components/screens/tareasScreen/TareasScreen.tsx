import { useEffect, useState } from "react";
import { sprintStore } from "../../../stores/sprintStore";
import { ColumnSprints } from "../../ui/ColumnSprints/ColumnSprints";
import { Header } from "../../ui/Header/Header";
import { ProgressTasks } from "../../ui/ProgressTasks/ProgressTasks";
import styles from "./TareasScreen.module.css";
import { ModalTaskProgress } from "../../ui/ModalTaskProgress/ModalTaskProgress";

export const TareasScreen = () => {

  const [openModalTaskProgress, setOpenModalTaskProgress] = useState(false)

  const sprintEnProgreso = sprintStore((state) => state.sprintEnProgreso)

  const [openProgressTask, setOpenProgressTask] = useState(false)

  useEffect(() => {
    if(sprintEnProgreso){
      setOpenProgressTask(true)
    }
  }, [sprintEnProgreso])

  const handleOpenModalTaskProgress = () => {
    setOpenModalTaskProgress(true)
  }

  const handleCloseModalTaskProgress = () => {
    setOpenModalTaskProgress(false)
  }
  return (
    <div>
      <Header />
      <div className={styles.containerMain}>
        <ColumnSprints texto="Backlog" link="backlog" />
        {openProgressTask ? <ProgressTasks handleOpenModalTaskProgress={handleOpenModalTaskProgress}/>: <h2 className={styles.titleNoSeeProgressTask}>Para ver el progreso de una sprint haz click en el ojo</h2>}
      </div>
      {openModalTaskProgress && <ModalTaskProgress handleCloseModalTaskProgress={handleCloseModalTaskProgress}/>}
    </div>
  );
};
