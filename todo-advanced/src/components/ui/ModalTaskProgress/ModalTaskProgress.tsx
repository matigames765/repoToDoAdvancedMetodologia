import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import styles from './ModalTaskProgress.module.css'
import { ISprint } from '../../../types/ISprint'
import { ITarea } from '../../../types/ITarea'
import { sprintStore } from '../../../stores/sprintStore'
import { useSprints } from '../../../hooks/useSprints'
import { tareaStore } from '../../../stores/tareaStore'

interface IPropsModalTaskProgress{
    handleCloseModalTaskProgress: () => void
}
const initialState: ITarea = {
    titulo: "",
    descripcion: "",
    estado: "pendiente",
    fechaLimite: ""
}
export const ModalTaskProgress: FC<IPropsModalTaskProgress> = ({handleCloseModalTaskProgress}) => {

    const tareaActiva = tareaStore((state) => state.tareaActiva)

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

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target

        setFormValues((prev) => ({...prev, [`${name}`]: value}))
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

            editarSprintHook(sprintEnProgreso)
        }else{
            sprintEnProgreso?.tareas?.push({id: crypto.randomUUID(), ...formValues})
            setSprintEnProgreso(sprintEnProgreso)
            if(sprintEnProgreso) editarSprintHook(sprintEnProgreso)
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
            <textarea
              placeholder="Ingrese la descripcion"
              required
              name="descripcion"
              className={styles.informationForm}
              onChange={handleChange} value={formValues.descripcion}
            />
            <label htmlFor="estado">Selecciona el estado</label>
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
            </select>
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
          </div>
          <div className={styles.buttonsModalTaskContainer}>
            <button className={styles.buttonsModalTask} onClick={handleCloseModalTaskProgress}>
                Cancelar
            </button>
            <button className={styles.buttonsModalTask} type="submit">
             {tareaActiva ? "Editar": "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}
