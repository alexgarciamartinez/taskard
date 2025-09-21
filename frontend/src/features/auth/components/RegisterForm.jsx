import React from "react";
import { useState } from "react";
import registerRequest from "../../../axios/authentication/RegisterRequest";
import InputFieldComponent from "../../../components/ui/InputFieldComponent";

export default function RegisterForm() {

    const [form, setForm] = useState({
        email: "",
        password: "",
        repeatPassword: "",
        name: "",
    })

    const handleChange = (e) => {
        const {name, value} = e.target

        setForm({
            ...form, 
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await registerRequest(form)

        console.log(response ? `REGISTRADO ${form}` : "ERROR")
    }

    return (
        <form 
            onSubmit={handleSubmit}
            className="bg-white p-8 w-full max-w-sm flex flex-col space-y-4"
        >
            <h2 className="text-2xl font-bold">Registro</h2>

            <InputFieldComponent 
                type={"text"}
                name={"name"}
                value={form.name}
                placeholder={"Nombre"}
                action={handleChange}
                required
            />

            <InputFieldComponent 
                type={"text"}
                name={"email"}
                value={form.email}
                placeholder={"Correo electrónico"}
                action={handleChange}
                required
            />

            <InputFieldComponent 
                type={"password"}
                name={"password"}
                value={form.password}
                placeholder={"Contraseña"}
                action={handleChange}
                required
            />

            <InputFieldComponent 
                type={"password"}
                name={"repeatPassword"}
                value={form.repeatPassword}
                placeholder={"Repetir contraseña"}
                action={handleChange}
                required
            />

            <button type="submit" className="w-full rounded-md text-white bg-blue-500 hover:bg-blue-600 hover:cursor-pointer p-2 transition-colors duration-200">
                Registrarse
            </button>
        </form>
    )
}