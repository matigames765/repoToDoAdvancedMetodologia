import axios from "axios";
import { ITarea } from "../types/ITarea";
import { editBacklog } from "../http/backLog";



const apibacklog_url = import.meta.env.VITE_APIBACKLOG_URL;

//obtenemos las tareas
export const getAllTareasController = async (): Promise<ITarea[] | undefined> => {
    try {
      const response = await axios.get<{tareas: ITarea[]}>(apibacklog_url!);
      return response.data.tareas;
    } catch (error) {
      console.log("Error al traer las tareas ", error);
    }
}

//creamos una tarea

export const createTaskController = async (newTask: ITarea) => {
    try {

        const tasksBd = await getAllTareasController()

        if(tasksBd){
            await editBacklog([...tasksBd, newTask])
        }else{
            await editBacklog([newTask])
        }
        
        return newTask
    } catch (error) {
      console.log("Error al crear la tarea", error);
    }
  };

  //funcion para actaulizar una tarea

export const editTaskController = async(updatedTask: ITarea) => {
    try{
        const tasksBd = await getAllTareasController()

        if(tasksBd){
            const newTasks = tasksBd.map((task) => (
                task.id === updatedTask.id ? {...task, ...updatedTask}: task
            ))

        await editBacklog(newTasks)

        }

        return updatedTask
    }catch(error){
        console.log("Error al actualizar la tarea, " +  error)
    }
}

//funcion para eliminar una tarea

export const deleteTaskController = async (idTask: string) => {
    try {
      const tasksBd = await getAllTareasController()

      if (tasksBd){
        const newTasks = tasksBd.filter((task) => (
            task.id !== idTask))

      await editBacklog(newTasks)
      }
    } catch (error) {
      console.log("No se pudo eliminar la tarea", error);
    }
  };
  

