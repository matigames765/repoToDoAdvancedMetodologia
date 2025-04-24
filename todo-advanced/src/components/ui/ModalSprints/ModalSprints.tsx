import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import styles from './ModalSprints.module.css'
import { ISprint } from '../../../types/ISprint'
import { useSprints } from '../../../hooks/useSprints'
import { sprintStore } from '../../../stores/sprintStore'
import { FormDataSprint, sprintSchema } from '../../../schemas/sprintSchema'

interface IPropsModalSprints{
    handleCloseModal: () => void
}

const initialState: ISprint = {
    fechaInicio: "",
    fechaCierre: "",
    nombre: "",
    tareas: []
}

const initialStateFormSprint: FormDataSprint = {
    fechaInicio: "",
    fechaCierre: "",
    nombre: "",
}

export const ModalSprints: FC<IPropsModalSprints> = ({handleCloseModal}) => {

    const setSprintEnProgreso = sprintStore((state) => state.setSprintEnProgreso)

    const sprintActivo = sprintStore((state) => state.sprintActivo)

    const {agregarSprintHook, editarSprintHook} = useSprints()

    const [formValues, setFormValues] = useState(initialState)
    const [errors, setErrors] = useState<FormDataSprint>(initialStateFormSprint)

    const [habilitado, setHabilitado] = useState<boolean>(true)

    const [colorErrorNombre, setColorErrorNombre] = useState(false)
    const [colorErrorFechaInicio, setColorErrorFechaInicio] = useState(false)
    const [colorErrorFechaCierre, setColorErrorFechaCierre] = useState(false)

    useEffect(() => {
        if(errors.fechaCierre === "Ingreso valido" && errors.fechaInicio === "Ingreso valido" && errors.nombre === "Ingreso valido"){
            setHabilitado(false)
        }else if ((errors.fechaCierre === "Ingreso valido" || errors.fechaInicio === "Ingreso valido" || errors.nombre === "Ingreso valido") && sprintActivo){
            setHabilitado(false)
        }else{
            setHabilitado(true)
        }
    }, [errors])

    useEffect(() => {
        if (errors.nombre == "Ingreso valido"){
            setColorErrorNombre(true)
        }else{
            setColorErrorNombre(false)
        }
    }, [errors.nombre])

    useEffect(() => {
        if (errors.fechaInicio == "Ingreso valido"){
            setColorErrorFechaInicio(true)
        }else{
            setColorErrorFechaInicio(false)
        }
    }, [errors.fechaInicio])

    useEffect(() => {
        if (errors.fechaCierre == "Ingreso valido"){
            setColorErrorFechaCierre(true)
        }else{
            setColorErrorFechaCierre(false)
        }
    }, [errors.fechaCierre])


    const handleChange = async(e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        setFormValues((prev) => ({...prev, [`${name}`]: value}))

        try{
            await sprintSchema.validateAt(name, {...formValues, [`${name}`]: value})

            setErrors((prev) => ({...prev, [`${name}`]: "Ingreso valido"}))
        }catch(error: any){
            setErrors((prev) => ({...prev, [`${name}`]: error.message}))
        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if(sprintActivo){
            setSprintEnProgreso(null)
            setSprintEnProgreso(formValues)
            editarSprintHook({...sprintActivo, ...formValues}, 0)
        }else{
            setSprintEnProgreso(null)
            setSprintEnProgreso(formValues)
            agregarSprintHook({id: crypto.randomUUID(), ...formValues})
        }

        handleCloseModal()
    }

    useEffect(() => {
        if(sprintActivo){
            setFormValues(sprintActivo)
        }else{
            setFormValues(initialState)
        }
    }, [sprintActivo])


  return (

    <div className={styles.containerBlur}>
    <div className={styles.containerPrincipalModalSprints}>
        <h3>{sprintActivo ? "Editar Sprint": "Crear Sprint"}</h3>
        <form onSubmit={handleSubmit}>
            <div className={styles.contentFormSprints}>
                <label>Fecha de inicio</label>
                <input type='date' autoComplete='off' required name='fechaInicio' className={styles.inputsSprints} value={formValues.fechaInicio} onChange={handleChange}/>
                <p className={colorErrorFechaInicio ? styles.validEnter : styles.errorMessage}>{errors.fechaInicio}</p>
                <label>Fecha de cierre</label>
                <input type='date' autoComplete='off' required name='fechaCierre' className={styles.inputsSprints} value={formValues.fechaCierre} onChange={handleChange}/>
                <p className={colorErrorFechaCierre ? styles.validEnter : styles.errorMessage}>{errors.fechaCierre}</p>
                <input type='text' autoComplete='off' required name='nombre' placeholder='Ingrese el nombre' className={styles.inputsSprints} value={formValues.nombre} onChange={handleChange}/>
                <p className={colorErrorNombre ? styles.validEnter : styles.errorMessage}>{errors.nombre}</p>
            </div>
            <div className={styles.buttonsModalSprintContainer}>
            <button className={styles.buttonsModalSprint} onClick={handleCloseModal}>
                Cancelar
            </button>
            <button className={styles.buttonsModalSprint} type="submit" disabled = {habilitado}>
            {sprintActivo ? "Editar": "Crear"}
            </button>
          </div>
        </form>
    </div>
    </div>
  )
}
