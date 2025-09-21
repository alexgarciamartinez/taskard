import React from "react";
import { useState } from "react";

import InputFieldComponent from "../../../components/ui/InputFieldComponent";
import ButtonComponent from "../../../components/ui/ButtonComponent";

import { ToastContainer, toast } from 'react-toastify';

import saveInvitationRequest from "../../../axios/project/invitation/SaveInvitationRequest";

export default function InviteUserForm({ projectId }) {

    const [formData, setFormData] = useState({
        projectId: projectId || "",
        email: ""
    })

    const notify = ({ type = "default", message }) => {
        switch (type) {
            case "success":
                toast.success(message)
                break;
            case "error":
                toast.error(message)
                break;
            case "info":
                toast.info(message)
                break;
            case "warning":
                toast.warning(message)
                break;
            default:
                toast(message)
        }
    }

    const toastMessages = {
        success: "¡Invitación enviada!",
        error: "No se pudo enviar la invitación"
    }

    const handleChangeForm = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await saveInvitationRequest(formData)

        if (response.success) {
            notify({ type: "success", message: toastMessages.success })
        } else {
            notify({ type: "error", message: response.message });
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>

                <div className="flex flex-row gap-4">
                    <InputFieldComponent
                        type={"text"}
                        name={"email"}
                        value={formData.email}
                        placeholder={"Correo electrónico"}
                        action={handleChangeForm}
                        required
                    />

                    <ButtonComponent
                        type={"submit"}
                        variant={"primary"}
                    >
                        Enviar invitación
                    </ButtonComponent>
                </div>
            </form>

            <ToastContainer />
        </>
    )
}