import React from "react";
import { useState } from "react";
import DraggableTableComponent from "../../../components/ui/DraggableTableComponent";

export default function DraggableBoard({ tasks, sprints, columns, handleDragStart, handleDrop }) {
    return (
        <div style={{ padding: 40 }}>
            <h2>Backlog</h2>
            <DraggableTableComponent
                columns={columns}
                rows={tasks}
                tableId={0}
                onDragStart={handleDragStart}
                onDrop={handleDrop}
                onDragOver={() => { }}
            />

            {sprints.length > 0 && (
                sprints.map((sprint) => (
                    <>
                        <h2>Sprint {sprint.id}</h2>

                        <DraggableTableComponent
                            columns={columns}
                            rows={sprint.tasks}
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