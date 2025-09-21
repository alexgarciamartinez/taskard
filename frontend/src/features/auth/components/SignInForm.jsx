import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import signInRequest from "../../../axios/authentication/SignInRequest";
import InputFieldComponent from "../../../components/ui/InputFieldComponent";

export default function SignInForm() {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(form)

        signInRequest(form)
            .then((status) => {
                (status) ? navigate("/projects") : alert("Invalid credentials")
            })
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-8 w-full max-w-sm flex flex-col space-y-4"
        >
            <h2 className="text-2xl font-bold">Iniciar sesión</h2>
            
            <InputFieldComponent
                type={"text"}
                name={"email"}
                placeholder={"Correo electrónico"}
                value={form.email}
                action={handleChange}
                required
            />

            <InputFieldComponent
                type={"password"}
                name={"password"}
                placeholder={"Contraseña"}
                value={form.password}
                action={handleChange}
                required
            />

            <button type="submit" className="w-full rounded-md text-white bg-blue-500 hover:bg-blue-600 hover:cursor-pointer p-2 transition-colors duration-200">Iniciar sesión</button>
        </form>
    )
}