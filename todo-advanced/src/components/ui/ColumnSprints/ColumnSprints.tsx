import { FC } from 'react'
import { CardSprints } from '../CardSprints/CardSprints'
import styles from './ColumnSprints.module.css'

interface IColumnSprints{
  texto: string
}

export const ColumnSprints: FC<IColumnSprints> = ({texto}) => {
  return (
    <div className={styles.containerColumnSprints}>
        <button className={styles.buttonVolverColumnSprints}>
            {texto}
        </button>
        <h2>sprints</h2>
        < CardSprints />
    </div>
  )
}
