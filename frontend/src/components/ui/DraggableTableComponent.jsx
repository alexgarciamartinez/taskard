import React from "react";

export default function DraggableTableComponent({
    columns,
    rows,
    onRowClick,
    onDragStart,
    onDrop,
    onDragOver,
    tableId
}) {
    return (
        <table
            onDragOver={(e) => {
                e.preventDefault()
                onDragOver && onDragOver(e, tableId)
                className="cursor-grab"
            }}
            onDrop={(e) => {
                onDrop && onDrop(e, tableId)
            }}
            className="w-full table-fixed border-separate border-spacing-0 rounded-md"
        >
            <thead>
                <tr className="bg-gray-100 border rounded-md">
                    {columns.map((col) => (
                        <th key={col.key} className="px-4 py-1 font-semibold text-gray-600 text-left">
                            {col.label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white">
                {rows.map((row) => (
                    <tr
                        key={row.id}
                        draggable
                        onDragStart={(e) => onDragStart(e, row, tableId)}
                        onClick={() => onRowClick && onRowClick(row)}
                        className="border-b cursor-pointer hover:bg-neutral-50 transition"
                    >
                        {columns.map((col) => (
                            <td key={col.key} className="px-4 py-2 border-b border-gray-200 text-left">
                                {col.render ? col.render(row) : row[col.key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}