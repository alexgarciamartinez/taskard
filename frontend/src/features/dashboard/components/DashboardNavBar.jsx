import React from "react";

export default function DashboardNavBar() {
    return (
        <header className="w-full h-12 bg-white border-b border-dashed border-gray-200 px-6 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Taskard</h1>
            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">Usuario</span>
            </div>
        </header>
    )
}