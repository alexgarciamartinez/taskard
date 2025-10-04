import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { X } from "lucide-react";

import InputFieldComponent from "../../../components/ui/InputFieldComponent"
import TipTapEditor from "../../../components/tiptap/TipTapEditor";
import ButtonComponent from "../../../components/ui/ButtonComponent";
import SelectComponent from "../../../components/ui/SelectComponent";
import PrioritySelectComponent from "./PrioritySelectComponent";

export default function CreateTaskForm({ onCreate, onClose, projectUsers }) {

    const { projectId } = useParams();

    const [taskForm, setTaskForm] = useState({
        title: "",
        description: "",
        projectId: projectId,
        assigneeId: "",
        duedate: null,
        priority: ""
    })

    const priorityOptions = [
        { value: "CRITICAL", label: "Crítica", color: '#ef4444' },
        { value: "HIGH", label: "Alta", color: '#ef4444' },
        { value: "MEDIUM", label: "Media", color: '#eab308' },
        { value: "LOW", label: "Baja", color: '#22c55e' }
    ]

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

    const formatDateToISO = (date) => {
        if (!date) return ''
        return date.toISOString().split('T')[0]
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        const formattedTask = {
            ...taskForm,
            duedate: formatDateToISO(taskForm.duedate),
        }

        onCreate(formattedTask)

        onClose()
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col p-6 w-full">
                <p className="text-xl font-semibold text-gray-800 mb-4">Crear tarea</p>

                <div className="mb-4">
                    <InputFieldComponent
                        type={"text"}
                        name={"title"}
                        value={taskForm.title}
                        placeholder={"Título"}
                        action={handleChange}
                        required
                    />
                </div>

                <div className="mb-4 w-full">
                    <TipTapEditor
                        value={taskForm.description}
                        onChange={(newValue) => setTaskForm((prev) => ({ ...prev, description: newValue }))}
                    />
                </div>

                <div className="mb-4 flex flex-row gap-4">
                    <SelectComponent
                        name={"assigneeId"}
                        value={taskForm.assigneeId}
                        onChange={handleChange}
                        options={projectUsers}
                        valueKey={"id"}
                        labelKey={"name"}
                        placeholder={"Asignar a..."}
                    />

                    <PrioritySelectComponent
                        value={taskForm.priority}
                        onChange={handleChange}
                        options={priorityOptions}
                    />
                </div>

                <div className="mb-4">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Basic date picker"
                            value={taskForm.duedate}
                            onChange={handleDateChange}
                        />
                    </LocalizationProvider>
                </div>

                <div className="flex flex-row justify-end gap-2">
                    <ButtonComponent
                        variant={"primary"}
                        type={"submit"}
                    >
                        Crear
                    </ButtonComponent>

                    {/* <ButtonComponent
                        variant={"danger"}
                        onClick={onClose}
                    >
                        <X />
                    </ButtonComponent> */}
                </div>
            </div>
        </form>
    )
}