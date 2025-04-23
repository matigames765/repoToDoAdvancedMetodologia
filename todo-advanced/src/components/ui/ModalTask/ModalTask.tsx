import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from './ModalTask.module.css'
import { ITarea } from '../../../types/ITarea';
import { tareaStore } from '../../../stores/tareaStore';
import { useTareas } from '../../../hooks/useTareas';
import { FC } from "react";
import { FormDataTask, taskSchema } from '../../../schemas/taskSchema';

interface IModalTask {
  handleCloseModal: VoidFunction;
}

const initialState: ITarea = {
  titulo: "",
  descripcion: "",
  estado: "pendiente",
  fechaLimite: ""
}

const initialStateFormTask: FormDataTask = {
  fechaLimite: "",
  titulo: "",
  descripcion: ""
}

export const ModalTask: FC<IModalTask> = ({handleCloseModal}) => {

  const setTareaActiva = tareaStore((state) => state.setTareaActiva)

  const tareaActiva = tareaStore((state) => state.tareaActiva)

  const {crearTarea, actualizarTarea} = useTareas()

  const [formValues, setFormValues] = useState(initialState)
  const [errors, setErrors] = useState<FormDataTask>(initialStateFormTask)

  const[colorErrorFechaLimite, setColorErrorFechaLimite] = useState(false)
  const[colorErrorTitulo, setColorErrorTitulo] = useState(false)
  const[colorErrorDescripcion, setcolorErrorDescripcion] = useState(false)

  const [habilitado, setHabilitado] = useState<boolean>(true)

  useEffect(() => {
    if (tareaActiva) {
      setFormValues(tareaActiva); 
    } else {
      setFormValues(initialState); 
    }
  }, [tareaActiva]);

  useEffect(() => {
    if(errors.fechaLimite === "Ingreso valido" && errors.titulo === "Ingreso valido" && errors.descripcion === "Ingreso valido"){
      setHabilitado(false)
  }else if ((errors.fechaLimite === "Ingreso valido" || errors.titulo=== "Ingreso valido" || errors.descripcion === "Ingreso valido") && tareaActiva){
     setHabilitado(false)
  }else{
      setHabilitado(true)
  }
  }, [errors])

  useEffect(() => {
    if (errors.fechaLimite== "Ingreso valido"){
        setColorErrorFechaLimite(true)
    }else{
        setColorErrorFechaLimite(false)
    }
}, [errors.fechaLimite])

useEffect(() => {
    if (errors.titulo == "Ingreso valido"){
        setColorErrorTitulo(true)
    }else{
        setColorErrorTitulo(false)
    }
}, [errors.titulo])

useEffect(() => {
    if (errors.descripcion == "Ingreso valido"){
        setcolorErrorDescripcion(true)
    }else{
        setcolorErrorDescripcion(false)
    }
}, [errors.descripcion])


  const handleChange = async(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target

    setFormValues((prev) => ({...prev, [`${name}`]: value}))

    try{
        await taskSchema.validateAt(name, {...formValues, [`${name}`]: value})
    
        setErrors((prev) => ({...prev, [`${name}`]: "Ingreso valido"}))
    }catch(error: any){
        setErrors((prev) => ({...prev, [`${name}`]: error.message}))
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if(tareaActiva){
      actualizarTarea({ ...tareaActiva, ...formValues })
      setTareaActiva(null)
    }else{
      crearTarea({id: crypto.randomUUID(), ...formValues})
    }

    handleCloseModal()
  }
  
  return (
    <>
    <div className={styles.containerBlur}>

      <div className={styles.containerModalTask}>
        <h3>{tareaActiva ? "Editar Tarea": "Crear tarea"}</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.contentForm}>
            <input
              type="text"
              required
              placeholder="Ingrese el título"
              autoComplete="off"
              name="titulo"
              className={styles.informationForm}
              onChange={handleChange} value={formValues.titulo}
            />
            <p className={colorErrorTitulo ? styles.validEnter : styles.errorMessage}>{errors.titulo}</p>
            <textarea
              placeholder="Ingrese la descripcion"
              required
              name="descripcion"
              className={styles.informationForm}
              onChange={handleChange} value={formValues.descripcion}
            />
            <p className={colorErrorDescripcion ? styles.validEnter : styles.errorMessage}>{errors.descripcion}</p>
            {/* <label htmlFor="estado">Selecciona el estado</label>
            <select
              id="estado"
              name="estado"
              required
              className={styles.informationForm}
              onChange={handleChange} value={formValues.estado}
            >
              <option value="pendiente">pendiente</option>
              <option value="en proceso">en proceso</option>
              <option value="completada">completada</option>
            </select> */}
            <label>Selecciona la fecha limite</label>
            <input
              type="date"
              required
              placeholder="Ingrese fecha limite"
              autoComplete="off"
              name="fechaLimite"
              className={styles.informationForm}
              onChange={handleChange} value={formValues.fechaLimite}
            ></input>
            <p className={colorErrorFechaLimite ? styles.validEnter : styles.errorMessage}>{errors.fechaLimite}</p>
          </div>
          <div className={styles.buttonsModalTaskContainer}>
            <button className={styles.buttonsModalTask} onClick={handleCloseModal}>
                Cancelar
            </button>
            <button className={styles.buttonsModalTask} type="submit" disabled={habilitado}>
            {tareaActiva ? "Editar": "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};
