import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { Undo2, Menu, Plus } from "lucide-react"

import getProjectsByUser from "../../../axios/project/GetProjectsByUserRequest";

export default function DashboardSideBar() {

    const { projectId } = useParams();

    const [projects, setProjects] = useState([])

    const [selectedProject, setSelectedProject] = useState(null)

    const [isMobileOpen, setIsMobileOpen] = useState(false)

    const toggleMobileSideBar = () => setIsMobileOpen(!isMobileOpen)
    const closeMobileSideBar = () => setIsMobileOpen(false)

    useEffect(() => {
        fetchProjects()
    }, [])

    useEffect(() => {
        console.log(projects)
    }, [projects])

    useEffect(() => {
        if (projectId && projects.length > 0) {
            const project = projects.find(p => String(p.id) === String(projectId));
            if (project) {
                setSelectedProject(project);
            }
        }
    }, [projectId, projects]);

    const sideBarProjectItems = [
        { label: "Dashboard", path: (id) => `/projects/${id}`},
        { label: "Kanban", path: (id) => `/projects/${id}/kanban` },
        { label: "Usuarios", path: (id) => `/projects/${id}/users` }
    ]

    const fetchProjects = async () => {
        try {
            const fetchedProjects = await getProjectsByUser()
            setProjects(fetchedProjects)
        } catch (error) {
            console.log(`Error fetching projects ${error}`)
        }
    }

    return (
        <>
            {/* Burger button (only in mobile) */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
                onClick={toggleMobileSideBar}
            >
                <Menu />
            </button>

            {/* Opened in mobile */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={toggleMobileSideBar}
                />
            )}

            {/* Responsive sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 h-screen bg-neutral-100 border-r-2 border-gray-200 p-4 z-50
                    transform transition-transform duration-300 ease-in-out
                    w-full max-w-xs
                    ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:relative lg:translate-x-0 lg:block lg:w-64
                    `}
            >
                <div className="flex flex-col items-start">
                    {!projectId && (
                        <>
                            <h2 className="font-bold text-2xl pb-10">Proyectos</h2>

                            <Link
                                to={"/projects/create"}
                                onClick={closeMobileSideBar}
                                className="w-full flex items-center justify-center gap-2 rounded-md bg-neutral-100 font-bold text-gray-600 hover:text-black cursor-pointer p-2 transition-colors duration-200"
                            >
                                Crear
                                <Plus />
                            </Link>

                            <div className="w-full mt-6 flex flex-col gap-2 transition-opacity duration-500">
                                {projects.map((project) => (
                                    <Link
                                        key={project.id}
                                        to={`/projects/${project.id}`}
                                        onClick={closeMobileSideBar}
                                        className="w-full text-left px-4 py-2 rounded-md hover:bg-neutral-200 hover:text-black transition-colors cursor-pointer text-gray-400 font-semibold"
                                    >
                                        {project.name}
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}

                    {projectId && selectedProject && (
                        <>
                            <div className="flex flex-row items-center py-2 px-4 w-full">
                                <h2 className="font-bold text-2xl">{selectedProject.name}</h2>

                                <Link
                                    to={"/projects"}
                                    onClick={closeMobileSideBar}
                                    className="ml-auto flex items-center gap-2 text-sm text-gray-400 hover:text-black hover:bg-neutral-200 px-2 py-1 rounded-md transition-colors"
                                >
                                    <Undo2 />
                                </Link>
                            </div>

                            <div className="w-full mt-6 flex flex-col gap-2 transition-opacity duration-500">
                                {sideBarProjectItems.map(({ label, path }) => (
                                    <Link
                                        key={label}
                                        to={path(selectedProject.id)}
                                        onClick={closeMobileSideBar}
                                        className="w-full text-left px-4 py-2 rounded-md hover:bg-neutral-200 hover:text-black transition-colors cursor-pointer text-gray-400 font-semibold"
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </aside>
        </>
    )
}