import styles from './ModalSprints.module.css'

export const ModalSprints = () => {
  return (
    <div className={styles.containerPrincipalModalSprints}>
        <h3>Crear Sprint</h3>
        <form>
            <div className={styles.contentFormSprints}>
                <label>Fecha de inicio</label>
                <input type='date' autoComplete='off' required name='fechaInicio' />
                <label>Fecha de cierre</label>
                <input type='date' autoComplete='off' required name='fechaInicio' />
                <input type='text' autoComplete='off' required name='nombre' placeholder='Ingrese el nombre'/>
            </div>
        </form>
    </div>
  )
}
