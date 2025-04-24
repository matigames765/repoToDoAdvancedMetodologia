import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ISprint } from "../types/ISprint";

interface ISprintStore {
  sprints: ISprint[];
  sprintActivo: ISprint | null;
  sprintEnProgreso: ISprint | null;
  setSprintActivo: (sprintActivo: ISprint | null) => void;
  agregarNuevoSprintState: (nuevoSprint: ISprint) => void;
  editarSprintState: (sprintActualizado: ISprint) => void;
  eliminarSprintState: (idSprint: string) => void;
  setArraySprints: (arraySprints: ISprint[]) => void;
  setSprintEnProgreso: (sprintEnProgreso: ISprint | null) => void;
}


const customStorage = {
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

export const sprintStore = create<ISprintStore>()(
  persist(
    (set) => ({
      sprints: [],
      sprintActivo: null,
      sprintEnProgreso: null,

      setSprintActivo: (sprintActivoIn) => set(() => ({ sprintActivo: sprintActivoIn })),
      agregarNuevoSprintState: (nuevoSprintIn) =>
        set((state) => ({ sprints: [...state.sprints, nuevoSprintIn] })),
      editarSprintState: (sprintActualizadoIn) =>
        set((state) => ({
          sprints: state.sprints.map((el) =>
            el.id === sprintActualizadoIn.id ? { ...el, ...sprintActualizadoIn } : el
          ),
        })),
      eliminarSprintState: (idSprintIn) =>
        set((state) => ({
          sprints: state.sprints.filter((el) => el.id !== idSprintIn),
        })),
      setArraySprints: (arraySprintsIn) => set(() => ({ sprints: arraySprintsIn })),
      setSprintEnProgreso: (sprintEnProgresoIn) =>
        set(() => ({ sprintEnProgreso: sprintEnProgresoIn })),
    }),
    {
      name: "sprint-storage",
      storage: customStorage, 
    }
  )
);
