import styles from './TaskCard.module.css'
import {Check, Eye, Pencil, Trash2} from 'lucide-react'

export const TaskCard = () => {
  return (
    <div className={styles.containerTaskCard}>
      <div className={styles.contentTaskCard}>
        <p>Título: Tarea1</p>
        <p >Descripción: descripción tarea 1</p>
        <p >Fecha límite: 2025-03-25</p>
        <div className={styles.buttonsTasks}>
          <button className={styles.buttonSentToBacklog}>Enviar a backlog</button>
          <button className={styles.buttonsHandleTasks}><Check size={20} color="black"/></button>
          <button className={styles.buttonsHandleTasks}><Eye size={20} color="black"/></button>
          <button className={styles.buttonsHandleTasks}><Pencil size={20} color="black"/></button>
          <button className={styles.buttonsHandleTasks}><Trash2 size={20} color="black"/></button>
        </div>
      </div>
    </div>
  )
}
