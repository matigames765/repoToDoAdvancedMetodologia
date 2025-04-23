import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import styles from './ModalTaskProgress.module.css'
import { ITarea } from '../../../types/ITarea'
import { sprintStore } from '../../../stores/sprintStore'
import { useSprints } from '../../../hooks/useSprints'
import { tareaStore } from '../../../stores/tareaStore'
import { FormDataTask, taskSchema } from '../../../schemas/taskSchema'

interface IPropsModalTaskProgress{
    handleCloseModalTaskProgress: () => void
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
export const ModalTaskProgress: FC<IPropsModalTaskProgress> = ({handleCloseModalTaskProgress}) => {

    const tareaActiva = tareaStore((state) => state.tareaActiva)
    const setTareaActiva = tareaStore((state) => state.setTareaActiva)

    useEffect(() => {
        if (tareaActiva) {
          setFormValues(tareaActiva); 
        } else {
          setFormValues(initialState); 
        }
    }, [tareaActiva]);
    


    const sprintEnProgreso = sprintStore((state) => state.sprintEnProgreso)
    const setSprintEnProgreso = sprintStore((state) => state.setSprintEnProgreso)

    const{editarSprintHook} = useSprints()

    const [formValues, setFormValues] = useState<ITarea>(initialState)

    const [errors, setErrors] = useState<FormDataTask>(initialStateFormTask)
    
    const[colorErrorFechaLimite, setColorErrorFechaLimite] = useState(false)
    const[colorErrorTitulo, setColorErrorTitulo] = useState(false)
    const[colorErrorDescripcion, setcolorErrorDescripcion] = useState(false)
    
    const [habilitado, setHabilitado] = useState<boolean>(true)

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
    

    const handleChange = async(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

        if(tareaActiva && sprintEnProgreso?.tareas){
            const index = sprintEnProgreso?.tareas.findIndex(tarea => tarea.id === tareaActiva.id);

            if (index !== undefined && index !== -1) {
                sprintEnProgreso!.tareas[index] = {
                ...sprintEnProgreso!.tareas[index],
                ...formValues
                };
            }

            editarSprintHook(sprintEnProgreso, 2)

            setTareaActiva(null)
        }else{
            sprintEnProgreso?.tareas?.push({id: crypto.randomUUID(), ...formValues})
            setSprintEnProgreso(sprintEnProgreso)
            if(sprintEnProgreso) editarSprintHook(sprintEnProgreso, 1)
        }

        handleCloseModalTaskProgress()
        
    }
  return (
    <>
    <div className={styles.containerBlur}>

      <div className={styles.containerModalTask}>
        <h3>{tareaActiva ? "Editar Tarea": "Crear Tarea"}</h3>
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
            <button className={styles.buttonsModalTask} 
            onClick={() => {
              setTareaActiva(null)
              handleCloseModalTaskProgress()}}>
                Cancelar
            </button>
            <button className={styles.buttonsModalTask} type="submit" disabled = {habilitado}>
             {tareaActiva ? "Editar": "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}
