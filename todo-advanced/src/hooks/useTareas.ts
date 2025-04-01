import { useShallow } from "zustand/shallow"
import { getAllTareasController } from "../data/tasksController"
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

    const getTareas = () => {
        try{
            return tareas;
        }catch(error){
            console.log("Error al traer las tareas, " + error)
        }
    }

    const crearTarea = (nuevaTarea: ITarea) => {
        try{
            agregarNuevaTarea(nuevaTarea)
            Swal.fire({
                title: "Exito",
                text: 'Se creo la tarea',
                icon: 'success'
            })
        }catch(error){
            console.log("Error al crear la tarea, " + error)
        }
    }

    const deleteTarea = (idTarea: string) => {
        try{
            eliminarTarea(idTarea)
            Swal.fire({
                title: 'Exito',
                text: 'Se elimino la tarea',
                icon: 'success'
            })
        }catch(error){
            console.log("Error al eliminar la tarea, " + error)
        }
    }

    const actualizarTarea = (tareaEditada: ITarea) => {
        try{
            editarTarea(tareaEditada)
            Swal.fire({
                title: 'Exito',
                text: 'Se edito la tarea',
                icon: 'success'
            })
        }catch(error){
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
        setearArrayTareas
    }
}