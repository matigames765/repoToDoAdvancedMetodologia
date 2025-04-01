import { FC } from 'react';
import styles from './ModalTask.module.css'

interface IModalTask{
  handleCloseModal: VoidFunction;
}

export const ModalTask: FC<IModalTask> = ({handleCloseModal}) => {
  return (
    <>
    <div className={styles.containerModalTask}>
      <h3>Crear tarea</h3>
      <form>
        <div className={styles.contentForm}>
          <input type='text' required placeholder='Ingrese el título' autoComplete='off' name='titulo' className={styles.informationForm}/>
          <textarea placeholder='Ingrese la descripcion' required name='descripcion' className={styles.informationForm}/>
          <input type='text' required placeholder='Ingrese el estado de la tarea' autoComplete='off' name='estado' className={styles.informationForm}/>
          <label htmlFor="estado">Selecciona el estado</label>
          <select id='estado' name='estado' required className={styles.informationForm}>
            <option>pendiente</option>
            <option>en proceso</option>
            <option>completada</option>
          </select>
          <input type='date' required placeholder='Ingrese fecha limite' autoComplete='off' name='fechaLimite' className={styles.informationForm}></input>
        </div>
      </form>
    </div>
    <div className={styles.containerButtonsModalTask}>
      <button className={styles.buttonsModalTask} onClick={
        handleCloseModal
      }>Cancelar</button>
      <button className={styles.buttonsModalTask} type='submit'>Enviar</button>
    </div>
    </>
  )
}
