import axios from "axios"
import { ISprint } from "../types/ISprint"

const apisprintlisturl = import.meta.env.VITE_APISPRINTLISTURL

//obtener todos los sprints
export const getSprintsController = async() => {
    try{
        const response = await axios.get<{sprints: ISprint[]}>(apisprintlisturl)

        return response.data.sprints
    }catch(error){
        console.log("Error al traer las sprints en el controller, " + error)
    }
}

//agregar un sprint
export const agregarSprintController = async(nuevoSprint: ISprint) => {
    const sprintsBd = await getSprintsController()

    try{
        
    }catch(error){
        //eliminar sprint si hay un error
        console.log("Error al agregar sprint en el controller, " + error)
    }
}