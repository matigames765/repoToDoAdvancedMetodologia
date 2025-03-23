import { CardSprints } from '../CardSprints/CardSprints'
import styles from './ColumnSprints.module.css'


export const ColumnSprints = () => {
  return (
    <div className={styles.containerColumnSprints}>
        <button className={styles.buttonVolverColumnSprints}>
            Volver
        </button>
        <h2>sprints</h2>
        < CardSprints />
    </div>
  )
}
