import axios from "axios";
import { ITarea } from "../types/ITarea";
import { IBacklog } from "../types/IBacklog";
import { API_URL } from "../utils/constantes";

//Crear Tareaa
export const createTask = async (task: ITarea) => {
  try {
    const response = await axios.post<IBacklog[]>(API_URL, { task: task });
    return response.data;
  } catch (error) {
    console.log("Error al crear la tarea", error);
  }
};
//Eliminar tarea
export const deleteTask = async (idTask: string) => {
  try {
    const response = await axios.delete(`/tareas/${idTask}`);
    return response.data;
  } catch (error) {
    console.log("No se pudo eliminar la tarea", error);
  }
};
//Mostrar tareas

export const getAllTareas = async () => {
  try {
    const response = await axios.get<IBacklog[]>(API_URL);
    return response.data;
  } catch (error) {
    console.log("Error al traer las tareas ", error);
  }
};

//Editar tarrea
export const editTask = async (tareas: ITarea[]) => {
  try {
    const response = await axios.put<IBacklog[]>(API_URL, { tareas: tareas });

    return response.data;
  } catch (error) {
    console.log("Algo salio mal al editar las tareas del backlog, ", error);
  }
};
