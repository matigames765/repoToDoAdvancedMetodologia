import { useShallow } from "zustand/shallow"
import { createTaskController, deleteTaskController, editTaskController, getAllTareasController } from "../data/tasksController"
import { tareaStore } from "../stores/tareaStore"
import { ITarea } from "../types/ITarea"
import Swal from "sweetalert2"

export const useTareas = () => {

    const {tareas, agregarNuevaTarea, eliminarTarea, editarTarea, setArrayTareas} = tareaStore(useShallow((state) => ({
        tareas: state.tareas,
        agregarNuevaTarea: state.agregarNuevaTarea,
        eliminarTarea: state.eliminarTarea,
        editarTarea: state.editarTarea,
        setArrayTareas: state.setArrayTareas
    })))

    const getTareas = async() => {
        try{
            const tareas = await getAllTareasController()
            if(tareas) setArrayTareas(tareas)
            return tareas
        }catch(error){
            console.log("Error al traer las tareas, " + error)
        }
    }

    const crearTarea = async(nuevaTarea: ITarea) => {
        agregarNuevaTarea(nuevaTarea)
        try{
            await createTaskController(nuevaTarea)
            Swal.fire({
                title: "Exito",
                text: 'Se creo la tarea',
                icon: 'success'
            })
        }catch(error){
            eliminarTarea(nuevaTarea.id!)
            console.log("Error al crear la tarea, " + error)
        }
    }

    const deleteTarea = async(idTarea: string) => {
        const estadoPrevio = tareas.find((el) => el.id === idTarea)
        eliminarTarea(idTarea)
        try{
            await deleteTaskController(idTarea)
            Swal.fire({
                title: 'Exito',
                text: 'Se elimino la tarea',
                icon: 'success'
            })
        }catch(error){
            if(estadoPrevio) agregarNuevaTarea(estadoPrevio)
            console.log("Error al eliminar la tarea, " + error)
        }
    }

    const actualizarTarea = async(tareaEditada: ITarea) => {
        const estadoPrevio = tareas.find((el) => el.id === tareaEditada.id)
        editarTarea(tareaEditada)
        try{
            await editTaskController(tareaEditada)
            Swal.fire({
                title: 'Exito',
                text: 'Se edito la tarea',
                icon: 'success'
            })
        }catch(error){
            if(estadoPrevio) agregarNuevaTarea(estadoPrevio)
            console.log("Error al actualizar la tarea, " + error)
        }
    }

    const setearArrayTareas = (tareas: ITarea[]) => {
        try{
            setArrayTareas(tareas)
        }catch(error){
            console.log("Error al setear las tareas, " + error)
        }
    }

    return {
        getTareas,
        crearTarea,
        deleteTarea,
        actualizarTarea,
        setearArrayTareas,
        tareas
    }
}