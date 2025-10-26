import react from "react";
import { useState } from "react"
import { useParams } from "react-router-dom";

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import ButtonComponent from "../../../components/ui/ButtonComponent";

export default function CreateSprintForm({ onCreate, onClose }) {

    const { projectId } = useParams()

    const [sprintForm, setSprintForm] = useState({
        projectId: projectId,
        startDate: null,
        endDate: null
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setSprintForm({
            ...sprintForm,
            [name]: value
        })
    }

    const handleStartDateChange = (newDate) => {
        setSprintForm({
            ...sprintForm,
            startDate: newDate,
        })
    }

    const handleEndDateChange = (newDate) => {
        setSprintForm({
            ...sprintForm,
            endDate: newDate,
        })
    }

    const formatDateToISO = (date) => {
        if (!date) return ''
        return date.toISOString().split('T')[0]
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formatedSprint = ({
            ...sprintForm,
            startDate: formatDateToISO(sprintForm.startDate),
            endDate: formatDateToISO(sprintForm.endDate)
        })

        onCreate(formatedSprint)

        onClose()
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col p-6 w-full">
                <p className="text-xl font-semibold text-gray-800 mb-4">Crear sprint</p>

                <div className="mb-4">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Inicio del sprint"
                            value={sprintForm.startDate}
                            onChange={handleStartDateChange}
                        />
                    </LocalizationProvider>
                </div>

                <div className="mb-4">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Fin del sprint"
                            value={sprintForm.endDate}
                            onChange={handleEndDateChange}
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
                </div>
            </div>
        </form>
    )
}