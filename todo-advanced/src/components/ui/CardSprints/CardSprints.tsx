import { FC } from 'react'
import { ISprint } from '../../../types/ISprint'
import styles from './CardSprints.module.css'

interface IPropsCardSprints{
  key: string,
  sprint: ISprint
}

export const CardSprints: FC<IPropsCardSprints> = ({sprint}) => {
  return (
    <div className={styles.containerCardSprints}>
        <p>{sprint.nombre}</p>
        <p>Inicio: {sprint.fechaInicio}</p>
        <p>Cierre: {sprint.fechaCierre}</p>
    </div>
  )
}
