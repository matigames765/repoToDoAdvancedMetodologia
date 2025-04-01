import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import styles from './ModalTask.module.css'
import { ITarea } from '../../../types/ITarea';
import { tareaStore } from '../../../stores/tareaStore';
import { useTareas } from '../../../hooks/useTareas';

interface IModalTask{
  handleCloseModal: VoidFunction;
}

const initialState: ITarea = {
  titulo: "",
  descripcion: "",
  estado: "",
  fechaLimite: ""
}

export const ModalTask: FC<IModalTask> = ({handleCloseModal}) => {

  const tareaActiva = tareaStore((state) => state.tareaActiva)
  const setTareaActiva = tareaStore((state) => state.setTareaActiva)

  const {crearTarea} = useTareas()

  const [formValues, setFormValues] = useState(initialState)

  useEffect(() => {
    if(tareaActiva) setTareaActiva(tareaActiva)
  })

  const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target

    setFormValues((prev) => ({...prev, [`${name}`]: value}))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    crearTarea({...formValues, id: new Date().toDateString()})

    setTareaActiva(null)

    handleCloseModal()
  }
  return (
    <>
    <div className={styles.containerModalTask}>
      <h3>Crear tarea</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.contentForm}>
          <input type='text' required placeholder='Ingrese el título' autoComplete='off' name='titulo' className={styles.informationForm} onChange={handleChange} value={formValues.titulo}/>
          <textarea placeholder='Ingrese la descripcion' required name='descripcion' className={styles.informationForm} onChange={handleChange} value={formValues.descripcion}/>
          <label htmlFor="estado">Selecciona el estado</label>
          <select id='estado' name='estado' required className={styles.informationForm} onChange={handleChange} value={formValues.estado}>
            <option>pendiente</option>
            <option>en proceso</option>
            <option>completada</option>
          </select>
          <input type='date' required placeholder='Ingrese fecha limite' autoComplete='off' name='fechaLimite' className={styles.informationForm} onChange={handleChange} value={formValues.fechaLimite}></input>
        </div>
      </form>
    </div>
    <div className={styles.containerButtonsModalTask}>
      <button className={styles.buttonsModalTask} onClick={
        handleCloseModal
      }>Cancelar</button>
      <button className={styles.buttonsModalTask} type='submit' onClick={handleCloseModal}>Enviar</button>
    </div>
    </>
  )
}
