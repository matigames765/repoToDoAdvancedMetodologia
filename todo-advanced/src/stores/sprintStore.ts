// import { create } from "zustand";
// import { ISprint } from "../types/ISprint";
// import { persist } from "zustand/middleware";

// interface ISprintStore{
//     sprints: ISprint[],
//     sprintActivo: ISprint | null,
//     sprintEnProgreso: ISprint | null,
//     setSprintActivo: (sprintActivo: ISprint | null) => void
//     agregarNuevoSprintState: (nuevoSprint: ISprint) => void
//     editarSprintState: (sprintActualizado: ISprint) => void
//     eliminarSprintState: (idSprint: string) => void
//     setArraySprints: (arraySprints: ISprint[] ) => void
//     setSprintEnProgreso: (sprintEnProgreso: ISprint | null) => void
// }

// export const sprintStore = create<ISprintStore>((set) => persist({
//     sprints: [],
//     sprintActivo: null,
//     sprintEnProgreso: null,

//     //setear el sprint activo

//     setSprintActivo: (sprintActivoIn) => set(() => ({sprintActivo: sprintActivoIn})),

//     //agregar nuevo sprint

//     agregarNuevoSprintState: (nuevoSprintIn) => set((state) => ({sprints: [...state.sprints, nuevoSprintIn]})),

//     //editar un sprint
//     editarSprintState: (sprintActualizadoIn) => set((state) => ({
//         sprints: state.sprints.map((el) => el.id === sprintActualizadoIn.id ? {...el, ...sprintActualizadoIn}: el),
//     })),

//     //eliminar una sprint
//     eliminarSprintState: (idSprintIn) => set((state) => ({
//         sprints: state.sprints.filter((el) => el.id !== idSprintIn)
//     })),

//     //setear array de sprints
//     setArraySprints: (arraySprintsIn) => set(() => ({sprints: arraySprintsIn})),

//     //setear sprint en progreso para la pantalla de tareas
//     setSprintEnProgreso: (sprintEnProgresoIn) => set(() => ({sprintEnProgreso: sprintEnProgresoIn})),
// }),
//     {
//         name: "sprint-storage",
//         getStorage: () => localStorage
//     }
// )

// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { ISprint } from "../types/ISprint";

// interface ISprintStore {
//   sprints: ISprint[];
//   sprintActivo: ISprint | null;
//   sprintEnProgreso: ISprint | null;
//   setSprintActivo: (sprintActivo: ISprint | null) => void;
//   agregarNuevoSprintState: (nuevoSprint: ISprint) => void;
//   editarSprintState: (sprintActualizado: ISprint) => void;
//   eliminarSprintState: (idSprint: string) => void;
//   setArraySprints: (arraySprints: ISprint[]) => void;
//   setSprintEnProgreso: (sprintEnProgreso: ISprint | null) => void;
// }

// export const useSprintStore = create<ISprintStore>()(
//   persist(
//     (set) => ({
//       sprints: [],
//       sprintActivo: null,
//       sprintEnProgreso: null,

//       setSprintActivo: (sprintActivoIn) => set({ sprintActivo: sprintActivoIn }),
//       agregarNuevoSprintState: (nuevoSprintIn) =>
//         set((state) => ({ sprints: [...state.sprints, nuevoSprintIn] })),
//       editarSprintState: (sprintActualizadoIn) =>
//         set((state) => ({
//           sprints: state.sprints.map((el) =>
//             el.id === sprintActualizadoIn.id ? { ...el, ...sprintActualizadoIn } : el
//           ),
//         })),
//       eliminarSprintState: (idSprintIn) =>
//         set((state) => ({
//           sprints: state.sprints.filter((el) => el.id !== idSprintIn),
//         })),
//       setArraySprints: (arraySprintsIn) => set({ sprints: arraySprintsIn }),
//       setSprintEnProgreso: (sprintEnProgresoIn) =>
//         set({ sprintEnProgreso: sprintEnProgresoIn }),
//     }),
//     {
//       name: "sprint-storage", // clave en localStorage
//       storage: {
//         getItem: (name) => localStorage.getItem(name),
//         setItem: (name, value) => localStorage.setItem(name, value),
//         removeItem: (name) => localStorage.removeItem(name),
//       },
//     }
//   )
// );

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
