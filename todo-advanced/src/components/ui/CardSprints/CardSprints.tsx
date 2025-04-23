import { FC } from 'react'
import { ISprint } from '../../../types/ISprint'
import styles from './CardSprints.module.css'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import { useSprints } from '../../../hooks/useSprints'
import { sprintStore } from '../../../stores/sprintStore'
import { useLocation, useNavigate } from 'react-router'

interface IPropsCardSprints{
  key: string,
  sprint: ISprint,
  handleOpenModalEdit: (sprint: ISprint) => void
}

export const CardSprints: FC<IPropsCardSprints> = ({sprint, handleOpenModalEdit}) => {

  const location = useLocation()
  const navigate = useNavigate()

  const setSprintEnProgreso = sprintStore((state) => state.setSprintEnProgreso)

  const editarSprint = () => {
    handleOpenModalEdit(sprint)
  }

  const {eliminarSprintHook} = useSprints()
  return (
    <div className={styles.containerCardSprints}>
        <p>{sprint.nombre}</p>
        <p>Inicio: {sprint.fechaInicio}</p>
        <p>Cierre: {sprint.fechaCierre}</p>
        <div className={styles.buttonsSprints}>
          <div className={styles.buttonSprintsContainer}>
            <button className={styles.buttonsHandleSprints} onClick={() => {
              if(location.pathname === '/backlog'){
                navigate('/')
                setSprintEnProgreso(null)
                setSprintEnProgreso(sprint)
              }else{
                setSprintEnProgreso(null)
                setSprintEnProgreso(sprint)
              }
            }}><Eye size={20} color="black"/></button>
            <button className={styles.buttonsHandleSprints} onClick={editarSprint}><Pencil size={20} color="black"/></button>
            <button className={styles.buttonsHandleSprints} onClick={() => {
              eliminarSprintHook(sprint.id!)
            }}><Trash2 size={20} color="black"/></button>
          </div>
        </div>
    </div>
  )
}
