import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import TableComponent from "../../../components/ui/TableComponent";
import MenuButtonComponent from "../../../components/ui/MenuButtonComponent";
import ButtonComponent from "../../../components/ui/ButtonComponent";
import ModalComponent from "../../../components/ui/ModalComponent";

import InviteUserForm from "../components/InviteUserForm";

import saveInvitationRequest from "../../../axios/project/invitation/SaveInvitationRequest";
import getUsersByProjectId from "../../../axios/project/users/GetUsersByProjectRequest";

import { Pencil, Trash, EllipsisVertical, Plus } from "lucide-react";

export default function UserManagementContainer() {

    const { projectId } = useParams()

    const [users, setUsers] = useState([])

    const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false)

    const [invitedUserForm, setInvitedUserForm] = useState({
        projectId: projectId || "",
        email: ""
    })

    useEffect(() => {
        fetchProjectUsers()
    }, [])

    const tableColumns = [
        { key: "name", label: "Nombre" },
        { key: "email", label: "Correo electrónico" },
        { key: "role", label: "Rol" },
    ]

    const fetchProjectUsers = async () => {
        try {
            const fetchedUsers = await getUsersByProjectId(projectId)
            setUsers(fetchedUsers)
        } catch (error) {
            console.log(`Error during fetching users in component => ${error}`)
            setUsers([])
        }
    }

    const handleChangeInvitationModal = () => {
        setIsInvitationModalOpen(!isInvitationModalOpen)
    }

    const handleChangeInvitation = (e) => {
        const { name, value } = e.target

        setInvitedUserForm({
            ...invitedUserForm,
            [name]: value
        })
    }

    const handleSubmitInvitation = async (e) => {
        e.preventDefault()

        await saveInvitationRequest(invitedUserForm)
            .then((status) => {
                (status) ? console.log("Invitación creada correctamente") : alert("Error al enviar invitación")
            })
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Usuarios del proyecto</h1>

            <div>

                {/* <InputFieldComponent
                    type="text"
                    name="email"
                    value={invitedUserForm.email}
                    placeholder="Invitar a..."
                    action={handleChangeInvitation}
                    required
                /> */}

            </div>
            <div className="flex gap-4 pb-4">

                <ButtonComponent
                    variant={"primary"}
                    onClick={handleChangeInvitationModal}
                >
                    <Plus />
                    Invitar
                </ButtonComponent>

            </div>
            <TableComponent
                columns={tableColumns}
                rows={users}
                renderActions={(user) => (
                    <MenuButtonComponent
                        size="sm"
                        icon={EllipsisVertical}
                        actions={[
                            { label: "Editar", icon: Pencil, onClick: () => console.log("Editar", user) },
                            { label: "Eliminar", icon: Trash, onClick: () => console.log("Eliminar", user) },
                        ]}
                    />
                )}
            />

            {isInvitationModalOpen && (
                <ModalComponent
                    onClose={handleChangeInvitationModal}
                >
                    <InviteUserForm
                        projectId={projectId}
                    />
                </ModalComponent>
            )}
        </div>
    )
}