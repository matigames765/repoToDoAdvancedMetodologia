import axios from "axios";
import { ITarea } from "../types/ITarea";
import { IBacklog } from "../types/IBacklog";
import {config} from 'dotenv'
import env from 'env-var'

//Editar backlog
export const editBacklog = async (tareas: ITarea[]) => {
  config()

  const apibacklog_url = env.get('APIBACKLOG_URL').asString()
  try {
    const response = await axios.put<IBacklog>(apibacklog_url!, { tareas: tareas });

    return response.data;
  } catch (error) {
    console.log("Algo salio mal al editar las tareas del backlog, ", error);
  }
};
