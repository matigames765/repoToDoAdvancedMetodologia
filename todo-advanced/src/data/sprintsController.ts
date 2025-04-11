import axios from "axios"
import { ISprint } from "../types/ISprint"
import { editSprintList } from "../http/SprintList"



const apisprintlisturl = import.meta.env.VITE_APISPRINTLIST_URL

//obtener todos los sprints
export const getSprintsController = async(): Promise<ISprint[] | undefined>  => {
    try{
        const response = await axios.get<{sprints: ISprint[]}>(apisprintlisturl)
        console.log("Respuesta completa GET sprints:", response.data)
        return response.data.sprints
    }catch(error){
        console.log("Error al traer las sprints en el controller, " + error)
    }
}

//agregar un sprint
export const agregarSprintController = async(nuevoSprint: ISprint) => {

    try{
        const sprintsBd = await getSprintsController()
        if(sprintsBd){
            await editSprintList([...sprintsBd, nuevoSprint])
        }else{
            await editSprintList([nuevoSprint])
        }

        return nuevoSprint
    }catch(error){
        console.log("Error al agregar sprint en el controller, " + error)
    }
}

//editar una sprint

export const editarSprintController = async(sprintActualizado: ISprint) => {
    try{
        const sprintsBd = await getSprintsController()
        if(sprintsBd){
          const newSprints = sprintsBd.map((el) => el.id === sprintActualizado.id ? {...el, ...sprintActualizado}: el)  
          await editSprintList(newSprints)
        }

        return sprintActualizado
    }catch(error){
        console.log("Error al editar sprint en el controller, " + error)
    }
}

//eliminar una sprint
export const eliminarSprintController = async(idSprint: string) => {
    try{
        const sprintsBd = await getSprintsController()
        if(sprintsBd){
            const newSprints = sprintsBd.filter((el) => el.id !== idSprint)
            await editSprintList(newSprints)
        }
    }catch(error){
        console.log("Error al eliminar la sprint en el controller, " + error)
    }
}

