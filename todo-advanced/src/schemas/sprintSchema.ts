import { InferType, object, string } from "yup";

export const sprintSchema = object({
    fechaInicio: string()
                .required("El campo fecha inicio es requerido"),
    fechaCierre: string()
                .required("El campo fecha cierre es requerido"),
    nombre: string()
            .required("El campo nombre es requerido")
})

export type FormDataSprint = InferType<typeof sprintSchema>;