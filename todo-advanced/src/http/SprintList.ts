import axios from "axios";
import { ISprint } from "../types/ISprint";
import { ISprintList } from "../types/ISprintList";

export const editSprintList = async(sprints: ISprint[]) => {
    const apisprintlisturl = import.meta.env.VITE_APISPRINTLIST_URL
    console.log(apisprintlisturl)

    try{
        const response = await axios.put<ISprintList>(apisprintlisturl!, {sprints: sprints})
        console.log("Respuesta PUT:", response.data);

        return response.data
    }catch(error){
        console.log("Error al editar la lista de sprints en editSprintList, " + error)
    }
}