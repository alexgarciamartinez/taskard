import React from "react";

import { EllipsisVertical } from "lucide-react"
import ButtonComponent from "../../../components/ui/ButtonComponent"

export default function TaskList({ tasks, onClick }) {

    const headers = [
        { camp: "Título" },
        { camp: "Asignado a " },
    ]

    return (
        <table class="w-full table-fixed border-separate border-spacing-0 rounded-md overflow-hidden">
            <thead>
                <tr class="bg-gray-100 border rounded-md">
                    {headers.map((header) => (
                        <th class="w-1/4 py-2 px-6 text-left text-gray-600 font-bold uppercase">{header.camp}</th>
                    ))}
                </tr>
            </thead>
            <tbody class="bg-white">
                {tasks.map((task) => (
                    <tr
                        key={task.id}
                        className="cursor-pointer hover:bg-gray-50 transition"
                        onClick={() => onClick(task)}
                    >
                        <td className="py-2 px-6 border-b border-gray-200">
                            {task.title}
                        </td>
                        <td className="py-2 px-6 border-b border-gray-200">
                            {task.assignee?.name || 'Sin asignar'}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}