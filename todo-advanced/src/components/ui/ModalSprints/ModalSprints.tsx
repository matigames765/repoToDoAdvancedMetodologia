import { ChangeEvent, FC, FormEvent, useState } from 'react'
import styles from './ModalSprints.module.css'
import { ISprint } from '../../../types/ISprint'
import { useSprints } from '../../../hooks/useSprints'

interface IPropsModalSprints{
    handleCloseModal: () => void
}

const initialState: ISprint = {
    fechaInicio: "",
    fechaCierre: "",
    nombre: "",
    tareas: []
}

export const ModalSprints: FC<IPropsModalSprints> = ({handleCloseModal}) => {
    const {agregarSprintHook} = useSprints()

    const [formValues, setFormValues] = useState(initialState)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        setFormValues((prev) => ({...prev, [`${name}`]: value}))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        agregarSprintHook({id: crypto.randomUUID(), ...formValues})

        handleCloseModal()
    }


  return (

    <div className={styles.containerBlur}>
    <div className={styles.containerPrincipalModalSprints}>
        <h3>Crear Sprint</h3>
        <form onSubmit={handleSubmit}>
            <div className={styles.contentFormSprints}>
                <label>Fecha de inicio</label>
                <input type='date' autoComplete='off' required name='fechaInicio' className={styles.inputsSprints} value={formValues.fechaInicio} onChange={handleChange}/>
                <label>Fecha de cierre</label>
                <input type='date' autoComplete='off' required name='fechaCierre' className={styles.inputsSprints} value={formValues.fechaCierre} onChange={handleChange}/>
                <input type='text' autoComplete='off' required name='nombre' placeholder='Ingrese el nombre' className={styles.inputsSprints} value={formValues.nombre} onChange={handleChange}/>
            </div>
            <div className={styles.buttonsModalSprintContainer}>
            <button className={styles.buttonsModalSprint} onClick={handleCloseModal}>
                Cancelar
            </button>
            <button className={styles.buttonsModalSprint} type="submit">
            Crear
            </button>
          </div>
        </form>
    </div>
    </div>
  )
}
