import { ColumnSprints } from "../../ui/ColumnSprints/ColumnSprints"
import { HeaderBacklog } from "../../ui/HeaderBacklog/HeaderBacklog"
import styles from './BacklogScreen.module.css'


export const BacklogScreen = () => {
  return (
    <div className={styles.containerBacklogScreen}>
      <HeaderBacklog />
      <ColumnSprints />
    </div>
  )
}
