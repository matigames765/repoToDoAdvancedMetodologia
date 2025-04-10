import { create } from "zustand";
import { ISprint } from "../types/ISprint";

interface ISprintStore{
    sprints: ISprint[],
    sprintActivo: ISprint | null,
    setSprintActivo: (sprintActivo: ISprint | null) => void
    agregarNuevoSprintState: (nuevoSprint: ISprint) => void
    editarSprintState: (sprintActualizado: ISprint) => void
    eliminarSprintState: (idSprint: string) => void
    setArraySprints: (arraySprints: ISprint[] ) => void
}

export const SprintStore = create<ISprintStore>((set) => ({
    sprints: [],
    sprintActivo: null,

    //setear el sprint activo

    setSprintActivo: (sprintActivoIn) => set(() => ({sprintActivo: sprintActivoIn})),

    //agregar nuevo sprint

    agregarNuevoSprintState: (nuevoSprintIn) => set((state) => ({sprints: [...state.sprints, nuevoSprintIn]})),

    //editar un sprint
    editarSprintState: (sprintActualizadoIn) => set((state) => ({
        sprints: state.sprints.map((el) => el.id === sprintActualizadoIn.id ? {...el, ...sprintActualizadoIn}: el),
    })),

    //eliminar una sprint
    eliminarSprintState: (idSprintIn) => set((state) => ({
        sprints: state.sprints.filter((el) => el.id !== idSprintIn)
    })),

    //setear array de sprints
    setArraySprints: (arraySprintsIn) => set(() => ({sprints: arraySprintsIn}))
}))