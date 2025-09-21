import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import RegisterPage from "../features/auth/pages/RegisterPage";
import SignInPage from "../features/auth/pages/SignInPage";
import DashboardPage from "../pages/DashboardPage";
import HomeDashboard from "../features/dashboard/components/HomeDashboard"
import CreateProjectContainer from "../features/project/pages/CreateProjectContainer";
import ProjectMainContainer from "../features/project/pages/ProjectMainContaner";
import UserManagementContainer from "../features/project/pages/UserManagementContainer";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/register" element={<RegisterPage />} />

                <Route path="/" element={<SignInPage />} />

                <Route path="/sign-in" element={<SignInPage />} />

                <Route
                    path="/projects"
                    element={
                        <PrivateRoute>
                            <DashboardPage />
                        </PrivateRoute>
                    }
                >
                    <Route index element={<HomeDashboard />} />

                    <Route path="create" element={<CreateProjectContainer />} />

                    <Route path=":projectId/users" element={<UserManagementContainer />} />

                    <Route path=":projectId" element={<ProjectMainContainer />} />

                </Route>

            </Routes>
        </BrowserRouter>
    )
}