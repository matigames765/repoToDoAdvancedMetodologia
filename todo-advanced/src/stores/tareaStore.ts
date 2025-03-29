import { ITarea } from "../types/ITarea";
import { create } from "zustand";

interface ITareaStore{
    tareas: ITarea[],
    tareaActiva: ITarea | null,
    setTareaActiva: (tareaActiva: ITarea | null) => void,
    setArrayTareas: (arrayTareas: ITarea[]) => void,
    agregarNuevaTarea: (nuevaTarea: ITarea) => void,
    editarTarea: (tareaActualizada: ITarea) => void,
    eliminarTarea: (idTarea: string) => void,

}

export const tareaStore =  create<ITareaStore>((set) => ({
    tareas: [],
    tareaActiva: null,

    //setear tarea activa

    setTareaActiva: (tareaActivaIn) => set(() => ({tareaActiva: tareaActivaIn})),

    //setear array de tareas

    setArrayTareas: (arrayTareasIn) => set(() => ({tareas: arrayTareasIn})),

    //agregar una tarea

    agregarNuevaTarea: (nuevaTareaIn) => set((state) => ({tareas: [...state.tareas, nuevaTareaIn]})),

    //editar una tarea

    editarTarea: (tareaActualizadaIn) => set((state) => {
        const arregloTareas = state.tareas.map((tarea) => tarea.id === tareaActualizadaIn.id ? {...tarea, ...tareaActualizadaIn}: tarea)
        return {tareas:arregloTareas}
    }),

    //eliminar una tarea

    eliminarTarea: (idTareaIn) => set((state) => ({
        tareas: state.tareas.filter((tarea) => tarea.id !== idTareaIn)
    }))


}))
