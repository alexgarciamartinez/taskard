import React from "react";

export default function DraggableTableComponent({
    columns,
    rows,
    onDragStart,
    onDrop,
    onDragOver,
    tableId
}) {
    return (
        <table
            onDragOver={(e) => {
                e.preventDefault();
                onDragOver && onDragOver(e, tableId);
            }}
            onDrop={(e) => {
                onDrop && onDrop(e, tableId);
            }}
            style={{ border: '1px solid #ccc', width: '100%', marginBottom: 40 }}
        >
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col.key}>{col.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr
                        key={row.id}
                        draggable
                        onDragStart={(e) => onDragStart(e, row, tableId)}
                        style={{
                            cursor: 'grab',
                            background: '#f9f9f9',
                            borderBottom: '1px solid #eee',
                        }}
                    >
                        {columns.map((col) => (
                            <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}