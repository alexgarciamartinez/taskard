import { th } from "date-fns/locale";
import React from "react";

export default function TableComponent({ columns = [], rows = [], onRowClick, renderActions }) {
    return (
        <table className="w-full table-fixed border-separate border-spacing-0 rounded-md">
            <thead>
                <tr className="bg-gray-100 border rounded-md">
                    {columns.map(({ key, label }) => (
                        <th key={key} className="px-4 py-1 font-semibold text-gray-600 text-left">
                            {label}
                        </th>
                    ))}
                    {renderActions && <th className="px-4 py-2" />}
                </tr>
            </thead>
            <tbody className="bg-white">
                {rows.map((item, i) => (
                    <tr key={i} 
                        className="border-b cursor-pointer hover:bg-neutral-50 transition"
                        onClick={() => onRowClick && onRowClick(item)}
                    >
                        {columns.map(({ key, render }) => (
                            <td key={key} className="px-4 py-2 border-b border-gray-200 text-left">
                                {render ? render(item) : item[key]}
                            </td>
                        ))}
                        {renderActions && (
                            <td className="px-4 py-2 border-b border-gray-200 text-right">
                                {renderActions(item)}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}