import axios from "axios";
import { ITarea } from "../types/ITarea";
import { IBacklog } from "../types/IBacklog";


//Editar backlog
export const editBacklog = async (tareas: ITarea[]) => {

  const apibacklog_url = import.meta.env.VITE_APIBACKLOG_URL;
  try {
    const response = await axios.put<IBacklog>(apibacklog_url!, { tareas: tareas });

    return response.data;
  } catch (error) {
    console.log("Algo salio mal al editar las tareas del backlog, ", error);
  }
};
