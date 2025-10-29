import react from "react";
import { useState, useEffect } from "react";

import InputFieldComponent from "../../../components/ui/InputFieldComponent";
import ButtonComponent from "../../../components/ui/ButtonComponent";
import ModalAcceptDenyComponent from "../../../components/ui/ModalAcceptDenyComponent";
import ViewTipTapText from "../../../components/tiptap/ViewTipTapText";
import TipTapEditor from "../../../components/tiptap/TipTapEditor";
import SelectComponent from "../../../components/ui/SelectComponent";

import { Pencil } from "lucide-react"
import { Trash2 } from "lucide-react"

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import deleteTaskById from "../../../axios/project/task/DeleteTaskByIdRequest";

export default function EditTaskForm({ task, onCreate, onClose, onDelete, projectUsers }) {

    useEffect(() => {
        console.log('Tarea a editar =>', task)
    }, [task])

    const [taskForm, setTaskForm] = useState(task || {})

    const [isEditing, setIsEditing] = useState(false)

    const [isDeleteModal, setIsDeleteModal] = useState(false)

    const handleChangeEditTask = () => {
        setIsEditing(!isEditing)
    }

    const handleChangeDeleteTask = () => {
        setIsDeleteModal(!isDeleteModal)
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setTaskForm({
            ...taskForm,
            [name]: value
        })
    }

    const handleDateChange = (newDate) => {
        setTaskForm({
            ...taskForm,
            duedate: newDate,
        })
    }

    const statusOptions = [
        { value: "TO_DO", label: "TO DO" },
        { value: "IN_PROGRESS", label: "En progreso" },
        { value: "IN_REVIEW", label: "En revisión" },
        { value: "DONE", label: "Terminada" }
    ]

    const formatDateToISO = (date) => {
        if (!date) return ''

        const parsedDate = date instanceof Date ? date : new Date(date)

        if (isNaN(parsedDate)) return ''

        return parsedDate.toISOString().split('T')[0]
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formattedTask = {
            ...taskForm,
            duedate: formatDateToISO(taskForm.duedate),
        }

        const cleanedTask = {
            id: taskForm.taskId,
            title: taskForm.title,
            description: taskForm.description,
            projectId: taskForm.projectId,
            assigneeId: taskForm.assigneeId ?? taskForm.assignee?.id,
            duedate: formattedTask.duedate,
            status: taskForm.status
        }

        onCreate(cleanedTask)

        onClose()
    }

    const handleDelete = async (e) => {
        e.preventDefault()

        const response = await deleteTaskById(taskForm.taskId)

        if (response) {
            handleChangeDeleteTask()

            onDelete(taskForm)

            onClose()
        } else {
            alert("Error al borrar tarea")
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col p-6 flex-grow justify-between h-full">
                    <p className="text-xl font-semibold text-gray-800 mb-4">Editar tarea</p>

                    <div className="mb-4">
                        {isEditing ? (
                            <InputFieldComponent
                                type={"text"}
                                name={"title"}
                                value={taskForm.title}
                                placeholder={"Título"}
                                action={handleChange}
                                required
                            />
                        ) : (
                            <p className="text-xl font-semibold text-gray-800 mb-4">{task?.title}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        {isEditing ? (
                            <TipTapEditor
                                value={taskForm?.description}
                                onChange={(newValue) => setTaskForm((prev) => ({ ...prev, description: newValue }))}
                            />
                        ) : (
                            <ViewTipTapText
                                content={task?.description}
                                className="min-h-[226px]"
                            />
                        )}
                    </div>

                    <div className="mb-4">
                        {isEditing ? (
                            <select
                                name="assigneeId"
                                value={taskForm?.assigneeId}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded text-black"
                            >
                                {projectUsers.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p className="text-xl font-semibold text-gray-800 mb-4">Asignado a: {task?.assignee?.name}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        {isEditing ? (
                            <SelectComponent
                                name={"status"}
                                value={taskForm.status}
                                onChange={handleChange}
                                options={statusOptions}
                                valueKey={"value"}
                                labelKey={"label"}
                                placeholder={"Prioridad"}
                            />
                        ) : (
                            <p className="text-xl font-semibold text-gray-800 mb-4">
                                Estado: {statusOptions.find(opt => opt.value === taskForm.status)?.label || "Sin estado"}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Fecha de entrega"
                                value={taskForm.duedate ? new Date(taskForm.duedate) : null}
                                onChange={handleDateChange}
                                readOnly={!isEditing}
                            />
                        </LocalizationProvider>
                    </div>

                    <div className="flex flex-row justify-end gap-2">
                        {isEditing && (
                            <ButtonComponent
                                variant={"primary"}
                                type={"submit"}
                            >
                                Guardar
                            </ButtonComponent>
                        )}

                        <ButtonComponent
                            variant={"primary"}
                            onClick={handleChangeEditTask}
                        >
                            <Pencil />
                        </ButtonComponent>

                        <ButtonComponent
                            variant={"danger"}
                            onClick={handleChangeDeleteTask}
                        >
                            <Trash2 />
                        </ButtonComponent>

                        <ButtonComponent
                            variant={"primary"}
                            onClick={onClose}
                        >
                            Cancelar
                        </ButtonComponent>
                    </div>
                </div>
            </form>
            {isDeleteModal && (
                <ModalAcceptDenyComponent
                    title={"Eliminar tarea"}
                    text={"Estás seguro de querer eliminar esta tarea?"}
                    onAccept={handleDelete}
                    onAcceptText={"Eliminar"}
                    onClose={handleChangeDeleteTask}
                    onCloseText={"Cancelar"}
                />
            )}
        </>
    )
}