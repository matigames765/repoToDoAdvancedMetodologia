import { useShallow } from "zustand/shallow"
import { sprintStore } from "../stores/sprintStore"
import { agregarSprintController, editarSprintController, eliminarSprintController, getSprintsController } from "../data/sprintsController"
import { ISprint } from "../types/ISprint"
import Swal from "sweetalert2"

export const useSprints = () => {

    //traer variables y actions de la store de las sprints
    const {sprints, agregarNuevoSprintState, editarSprintState, eliminarSprintState, setArraySprints} = sprintStore(useShallow((state) => ({
        sprints: state.sprints,
        agregarNuevoSprintState: state.agregarNuevoSprintState,
        editarSprintState: state.editarSprintState,
        eliminarSprintState: state.eliminarSprintState,
        setArraySprints: state.setArraySprints
    })))

    //traemos las sprints en el hook
    const getSprintsHook = async() => {
        try{
            const sprints = await getSprintsController()
            console.log("Sprints obtenidos en el hook:", sprints);
            if(sprints) setArraySprints(sprints)

            return sprints
        }catch(error){
            console.log("Error al tareas las tareas en el hook, " + error)
        }
    }

    //agregamos la sprint en el hook
    const agregarSprintHook = async(nuevoSprint: ISprint) => {
        agregarNuevoSprintState(nuevoSprint)
        try{
            await agregarSprintController(nuevoSprint)
            Swal.fire({
                title: "Exito",
                text: "Se creo el sprint con exito",
                icon: "success"
            })
        }catch(error){
            eliminarSprintState(nuevoSprint.id!)
            console.log("Error al agregar sprint en el hook, " + error)
        }
    }

    //editamos la sprint en el hook
    const editarSprintHook = async(sprintActualizado: ISprint) => {
        const estadoPrevio = sprints.find((el) => el.id === sprintActualizado.id)
        editarSprintState(sprintActualizado)
        try{
            await editarSprintController(sprintActualizado)
            Swal.fire({
                title: "Exito",
                text: "Se edito el sprint con exito",
                icon: "success"
            })
        }catch(error){
            if(estadoPrevio) editarSprintState(estadoPrevio)
            console.log("Error al editar sprint en el hook, " +  error)
        }
    }

    //eliminamos la sprint en el hook
    const eliminarSprintHook = async(idSprint: string) => {
        const sprintPrevio = sprints.find((el) => el.id === idSprint)
        eliminarSprintState(idSprint)
        try{
            await eliminarSprintController(idSprint)
            Swal.fire({
                title: "Exito",
                text: "Se elimino el sprint con exito",
                icon: "success"
            })
        }catch(error){
            if(sprintPrevio) agregarNuevoSprintState(sprintPrevio)
            console.log("Error al eliminar la sprint en el hook, " + error)
        }
    }


    return({
        sprints,
        getSprintsHook,
        agregarSprintHook,
        editarSprintHook,
        eliminarSprintHook
    })

    
}