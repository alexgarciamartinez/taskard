import React from "react";
import { useState } from "react";

import DraggableTableComponent from "../../../components/ui/DraggableTableComponent";
import ButtonComponent from "../../../components/ui/ButtonComponent";

import { ChevronDown, ChevronRight } from "lucide-react";

import clsx from "clsx";

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
                <ButtonComponent
                    onClick={toggleBacklog}
                    variant={"outline"}
                    className={"border-none w-full flex justify-start items-left"}
                >
                    <ChevronDown
                        className={clsx(
                            "transition-transform duration-300",
                            collapsed.backlog ? "rotate-[-90deg]" : "rotate-0"
                        )}
                    />
                    Backlog
                </ButtonComponent>

                <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden`}
                    style={{
                        maxHeight: collapsed.backlog ? 0 : 1000,
                        opacity: collapsed.backlog ? 0 : 1,
                    }}
                >
                    <div className="pb-6">
                        <DraggableTableComponent
                            columns={columns}
                            rows={tasks}
                            onRowClick={onRowClick}
                            tableId={0}
                            onDragStart={handleDragStart}
                            onDrop={handleDrop}
                            onDragOver={() => { }}
                        />
                    </div>
                </div>
            </div>

            {sprints.length > 0 && (
                sprints.map((sprint) => (
                    <div key={sprint.id}>
                        <ButtonComponent
                            onClick={() => toggleSprint(sprint.id)}
                            variant={"outline"}
                            className={"border-none w-full flex justify-start items-left"}
                        >
                            <ChevronDown
                                className={clsx(
                                    "transition-transform duration-300",
                                    collapsed.sprints[sprint.id] ? "rotate-[-90deg]" : "rotate-0"
                                )}
                            />
                            Sprint {sprint.id}
                        </ButtonComponent>

                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden`}
                            style={{
                                maxHeight: collapsed.sprints[sprint.id] ? 0 : 1000,
                                opacity: collapsed.sprints[sprint.id] ? 0 : 1,
                            }}
                        >
                            <div className="pb-6">
                                <DraggableTableComponent
                                    columns={columns}
                                    rows={sprint.tasks}
                                    onRowClick={onRowClick}
                                    tableId={sprint.id}
                                    onDragStart={handleDragStart}
                                    onDrop={handleDrop}
                                    onDragOver={() => { }}
                                />
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}