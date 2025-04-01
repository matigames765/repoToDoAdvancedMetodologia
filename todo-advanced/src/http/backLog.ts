import axios from "axios";
import { ITarea } from "../types/ITarea";
import { IBacklog } from "../types/IBacklog";
import {APIBACKLOG_URL } from "../utils/constantes";


//Editar backlog
export const editBacklog = async (tareas: ITarea[]) => {
  try {
    const response = await axios.put<IBacklog>(APIBACKLOG_URL, { tareas: tareas });

    return response.data;
  } catch (error) {
    console.log("Algo salio mal al editar las tareas del backlog, ", error);
  }
};
