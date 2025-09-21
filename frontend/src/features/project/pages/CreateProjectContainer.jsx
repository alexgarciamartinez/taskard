import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputFieldComponent from "../../../components/ui/InputFieldComponent";

import saveProjectRequest from "../../../axios/project/SaveProjectRequest";

export default function CreateProjectContainer() {

    const navigate = useNavigate()

    const [projectForm, setProjectForm] = useState({
        name: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setProjectForm({
            ...projectForm,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(projectForm)

        saveProjectRequest(projectForm)
            .then((status) => {
                (status) ? navigate("/projects") : alert("Nombre inválido")
            })
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Nuevo Proyecto</h1>
            <form
                onSubmit={handleSubmit}
                className="space-y-4 max-w-md">
                <div>

                    <InputFieldComponent
                        type="text"
                        name="name"
                        value={projectForm.name}
                        placeholder="Nombre del proyecto..."
                        action={handleChange}
                        required
                    />

                </div>
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => navigate("/projects")}
                        className="bg-gray-700 text-gray-300 px-4 py-2 hover:bg-gray-600 cursor cursor-pointer transition"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 cursor cursor-pointer transition"
                    >
                        Crear Proyecto
                    </button>
                </div>
            </form>
        </div>
    )
}