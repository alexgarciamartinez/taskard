import React from "react";
import { useState } from "react";
import DraggableTableComponent from "../../../components/ui/DraggableTableComponent";

export default function DraggableBoard({ tasks, sprints, columns, handleDragStart, handleDrop, onRowClick }) {

    const [collapsed, setCollapsed] = useState({
        backlog: false,
        sprints: {}
    })

    const toggleBacklog = () => {
        setCollapsed(prev => ({
            ...prev,
            backlog: !prev.backlog
        }))
    }

    const toggleSprint = (sprintId) => {
        setCollapsed(prev => ({
            ...prev,
            sprints: {
                ...prev.sprints,
                [sprintId]: !prev.sprints[sprintId]
            }
        }))
    }

    return (
        <div className="p-4">
            <div>
                <h2
                    className="text-xl font-semibold cursor-pointer select-none"
                    onClick={toggleBacklog}
                >
                    {collapsed.backlog ? '▶' : '▼'} Backlog
                </h2>

                {!collapsed.backlog && (
                    <DraggableTableComponent
                        columns={columns}
                        rows={tasks}
                        onRowClick={onRowClick}
                        tableId={0}
                        onDragStart={handleDragStart}
                        onDrop={handleDrop}
                        onDragOver={() => { }}
                    />
                )}
            </div>

            {sprints.length > 0 && (
                sprints.map((sprint) => (
                    <>
                        <h2>Sprint {sprint.id}</h2>

                        <DraggableTableComponent
                            columns={columns}
                            rows={sprint.tasks}
                            onRowClick={onRowClick}
                            tableId={sprint.id}
                            onDragStart={handleDragStart}
                            onDrop={handleDrop}
                            onDragOver={() => { }}
                        />
                    </>
                ))
            )}
        </div>
    )
}