import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import DashboardSideBar from "../features/dashboard/components/DashboardSideBar";
import DashboardNavBar from "../features/dashboard/components/DashboardNavBar";
import CreateProjectContainer from "../features/project/pages/CreateProjectContainer";

export default function DashboardPage() {

    return (
        <div className="min-h-screen flex">
            <DashboardSideBar />
            <div className="flex-1 flex flex-col">
                
                <DashboardNavBar />

                <main className="flex-1 bg-white-100 p-6">
                    <Outlet />
                </main>

            </div>
        </div>
    )
}