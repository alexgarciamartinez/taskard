import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import DashboardSideBar from "../features/dashboard/components/DashboardSideBar";
import DashboardNavBar from "../features/dashboard/components/DashboardNavBar";
import CreateProjectContainer from "../features/project/pages/CreateProjectContainer";

export default function DashboardPage() {

    return (
        <div className="flex h-screen overflow-hidden">
            <DashboardSideBar />
            <div className="flex flex-col flex-1">
                
                <DashboardNavBar />

                <main className="flex-1 overflow-y-auto bg-white p-6">
                    <Outlet />
                </main>

            </div>
        </div>
    )
}