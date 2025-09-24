import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import TaskList from "../components/TaskList";
import CreateTaskModal from "../components/CreateTaskModal";
import EditTaskModal from "../components/EditTaskModal";
import ButtonComponent from "../../../components/ui/ButtonComponent";
import ModalComponent from "../../../components/ui/ModalComponent";
import TableComponent from "../../../components/ui/TableComponent";

import CreateTaskForm from "../components/CreateTaskForm";

import { Plus } from "lucide-react";

import { ToastContainer, toast } from 'react-toastify';

import getTasksByProject from "../../../axios/project/task/GetTasksByProjectRequest";
import getUsersByProjectId from "../../../axios/project/users/GetUsersByProjectRequest";
import createTaskRequest from "../../../axios/project/task/CreateTaskRequest";
import updateTaskRequest from "../../../axios/project/task/UpdateTaskRequest";
import deleteTaskById from "../../../axios/project/task/DeleteTaskByIdRequest";
import saveSprintRequest from "../../../axios/project/sprint/SaveSprintRequest";
import getSprintsByProjectRequest from "../../../axios/project/sprint/GetSprintsByProjectRequest";

export default function ProjectMainContainer() {

    const { projectId } = useParams();

    const [tasks, setTasks] = useState([])

    const [sprints, setSprints] = useState([])

    const [projectUsers, setProjectUsers] = useState([])

    const [createTaskModal, setCreateTaskModal] = useState(false)

    const [editTaskModal, setEditTaskModal] = useState(false)

    const [selectedTask, setSelectedTask] = useState(null)

    useEffect(() => {
        fetchTasks()
        fetchProjectUsers()
        fetchSprints()
    }, [])

    useEffect(() => {
        console.log(tasks)
    }, [tasks])

    useEffect(() => {
        console.log(projectUsers)
    }, [projectUsers])

    useEffect(() => {
        console.log(sprints)
    }, [sprints])

    const toastMessages = {
        createdTaskSuccess: "¡Tarea creada correctamente!",
        updatedTaskSuccess: "¡Tarea actualizada correctamente!",
        deletedTaskSuccess: "¡Tarea eliminada correctamente!",
        createdSprintSuccess: "¡Sprint creado correctamente!",
        error: "Ha ocurrido un error"
    }

    const notify = (message) => toast(message)

    const taskListColumns = [
        { key: "title", label: "Título" },
        { key: "duedate", label: "Entrega" },
        {
            key: "assignee",
            label: "Asignado a",
            render: (item) => item.assignee?.name || "Sin asignar"
        },
    ]

    const fetchTasks = async () => {
        try {
            const fetchedTasks = await getTasksByProject(projectId)
            setTasks(fetchedTasks || [])
        } catch (error) {
            console.log(`Error fetching tasks in component => ${error}`)
            setTasks([])
        }
    }

    const fetchProjectUsers = async () => {
        try {
            const fetchedUsers = await getUsersByProjectId(projectId)
            setProjectUsers(fetchedUsers)
        } catch (error) {
            console.log(`Error during fetching users in component => ${error}`)
            setProjectUsers([])
        }
    }

    const fetchSprints = async () => {
        try {
            const fetchedSprints = await getSprintsByProjectRequest(projectId)
            setSprints(fetchedSprints)
        } catch (error) {
            console.log("Error fetching sprints in component => ", error)
            setSprints([])
        }
    } 

    const handleChangeCreateTaskModal = () => {
        setCreateTaskModal(!createTaskModal)
    }

    const handleOpenEditTaskModal = (task) => {
        setSelectedTask(task)
        setEditTaskModal(true)
    }

    const handleCloseEditTaskModal = () => {
        setSelectedTask(null)
        setEditTaskModal(false)
    }

    const handleTaskSubmit = async (task) => {
        const response = await createTaskRequest(task)

        if (response.body != null) {
            setTasks([...tasks, response.body])

            notify(toastMessages.createdTaskSuccess)
        } else {
            notify(toastMessages.error)
        }
    }

    const handleUpdateTaskSubmit = async (task) => {
        const response = await updateTaskRequest(task)

        if (response.body != null) {
            setTasks(prev =>
                prev.map(t => t.taskId === response.body.taskId ? response.body : t)
            )

            notify(toastMessages.updatedTaskSuccess)
        } else {
            notify(toastMessages.error)
        }
    }

    const handleTaskDelete = (deletedTask) => {
        setTasks(tasks.filter(task => task.taskId !== deletedTask.taskId))

        notify(toastMessages.deletedTaskSuccess)
    }

    const handleSprintSubmit = async () => {
        const createSprint = {
            projectId: projectId
        }

        const response = await saveSprintRequest(createSprint)

        if (response != null) {
            setSprints([...sprints, response])

            notify(toastMessages.createdSprintSuccess)
        } else {
            notify(toastMessages.error)
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

            {tasks.length > 0 && (
                <TableComponent
                    columns={taskListColumns}
                    rows={tasks}
                    onRowClick={handleOpenEditTaskModal}
                />
            )}

            {sprints.length > 0 && (
                sprints.map((sprint) => (
                    <div key={sprint.id}>
                        <p>Sprint {sprint.sprintCounter}</p>
                    </div>
                ))
            )}

            <div className="pt-5">
                <ButtonComponent
                    variant={"primary"}
                    onClick={handleChangeCreateTaskModal}
                >
                    Crear tarea
                    <Plus className="h-4 w-4 mr-2" />
                </ButtonComponent>
            </div>

            <div className="pt-5">
                <ButtonComponent
                    variant={"primary"}
                    onClick={handleSprintSubmit}
                >
                    Crear sprint
                    <Plus className="h-4 w-4 mr-2" />
                </ButtonComponent>
            </div>

            {createTaskModal && (
                /*<CreateTaskModal
                    onCreate={handleTaskSubmit}
                    onClose={handleChangeCreateTaskModal}
                    projectUsers={projectUsers}
                />*/
                <ModalComponent
                    onClose={handleChangeCreateTaskModal}
                >
                    <CreateTaskForm
                        onCreate={handleTaskSubmit}
                        onClose={handleChangeCreateTaskModal}
                        projectUsers={projectUsers}
                    />
                </ModalComponent>
            )}

            {editTaskModal && (
                <EditTaskModal
                    task={selectedTask}
                    onCreate={handleUpdateTaskSubmit}
                    onClose={handleCloseEditTaskModal}
                    onDelete={handleTaskDelete}
                    projectUsers={projectUsers}
                />
            )}
            <ToastContainer />
        </div>
    )
}