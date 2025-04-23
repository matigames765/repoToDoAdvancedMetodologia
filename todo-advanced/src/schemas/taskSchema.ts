import { InferType, object, string } from "yup";

export const taskSchema = object({
    titulo: string()
            .required("El campo titulo es requerido")
            .min(3, "El titulo debe tener minimo 3 caracteres"),
    descripcion: string()
                .required("El campo descripcion es obligatorio")
                .min(10, "Minimo 10 caracteres"),
    fechaLimite: string()
                .required("El campo fecha limite es requerido")
})

export type FormDataTask = InferType<typeof taskSchema>;