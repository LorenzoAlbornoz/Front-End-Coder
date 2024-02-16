import * as yup from "yup"

export const REGISTER_SCHEMA = yup.object({
    email: yup
        .string()
        .required("El correo electrónico es requerido")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            "Ingresa una dirección de correo electrónico válida"
        )
        .max(25, "El correo electrónico debe tener como máximo 25 caracteres"),
    name: yup.string()
        .required("El nombre completo es requerido")
        .matches(/^[A-Za-z]+(\s[A-Za-z]+)*$/, 'El nombre solo debe contener letras y espacios')
        .max(25, "El máximo son 25 caracteres")
        .min(5, "El mínimo son 5 caracteres"),
    password: yup
        .string()
        .required("La contraseña es requerida")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/,
            "Ingresa una constraseña válida"
        )
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(20, "La contraseña debe tener como máximo 20 caracteres"),
    repassword: yup
        .string()
        .required("Repetir la contraseña es requerido")
        .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(20, "La contraseña debe tener como máximo 20 caracteres")

})

export const LOGIN_SCHEMA = yup.object({
    email: yup
        .string()
        .required("El correo electrónico es requerido")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            "Ingresa una dirección de correo electrónico válida"
        ),
    password: yup
        .string()
        .required("La contraseña es requerida")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/,
            "Ingresa una constraseña válida"
        ),
})

export const RECOVERPASSWORD_SCHEMA = yup.object({
    email: yup.string().required("El email es requerido")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            "Ingresa una dirección de correo electrónico válida"
        )
})

export const FORM_SCHEMA = yup.object().shape({
    title: yup.string()
        .required("El título es requerido")
        .max(30, "El título no puede tener más de 30 caracteres"),
    description: yup.string()
        .required("La descripción es requerida")
        .max(80, "La descripción no puede tener más de 80 caracteres"),
    price: yup.number()
        .required("El precio es requerido")
        .moreThan(0, "El precio no puede ser negativo")
        .typeError("El precio debe ser un número"),
    category: yup.string()
        .required("La categoría es requerida"),
    code: yup.string()
        .typeError("El code es requerido")
        .max(5, "La descripción no puede tener más de 5 caracteres"),
    stock: yup.number()
        .typeError("El stock es requerido")
        .test('is-positive', 'El stock no puede ser un número negativo', (value) => value >= 0)
});

  export const UPDATE_USER_SCHEMA = yup.object({
    role: yup.string()
      .required("El rol es requerido")
      .oneOf(['admin', 'premiun', 'user'], 'Rol no válido')
  });