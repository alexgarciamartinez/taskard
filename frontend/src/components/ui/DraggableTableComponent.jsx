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
                e.preventDefault();
                onDragOver && onDragOver(e, tableId);
            }}
            onDrop={(e) => {
                onDrop && onDrop(e, tableId);
            }}
            className="w-full table-fixed border-collapse rounded-md"
        >
            <tbody className="bg-white">
                {rows.length === 0 && (
                    <tr
                        className="h-12"
                        onDragOver={(e) => {
                            e.preventDefault();
                            onDragOver && onDragOver(e, tableId)
                        }}
                        onDrop={(e) => {
                            e.stopPropagation()
                            onDrop && onDrop(e, tableId)
                        }}
                    >
                        <td colSpan={columns.length} className="text-center text-gray-400" />
                    </tr>
                )}
                {rows.map((row) => (
                    <tr
                        key={row.id}
                        draggable
                        onDragStart={(e) => onDragStart(e, row, tableId)}
                        onClick={() => onRowClick && onRowClick(row)}
                        className="cursor-pointer hover:bg-neutral-50 transition"
                    >
                        {columns.map((col, colIndex) => (
                            <td
                                key={col.key}
                                className={`text-sm px-4 py-2 text-left border-t border-b border-gray-200 ${colIndex === 0 ? 'border-l' : ''
                                    } ${colIndex === columns.length - 1 ? 'border-r' : ''}`}
                            >
                                {col.render ? col.render(row) : row[col.key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}