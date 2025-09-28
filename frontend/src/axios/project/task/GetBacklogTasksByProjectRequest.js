import axiosInstance from "../../AxiosInstance";

const backendUrl = import.meta.env.VITE_BACKEND_URL

export default async function getBacklogTasksByProjectRequest(projectId) {
    try {
        const response = await axiosInstance.get(`${backendUrl}/api/task/${projectId}/get-backlog-tasks-by-project`)

        if (response.data.status === 'OK') {
            console.log("Tasks fetched!")
            return response.data.body
        } else {
            return false
        }
    } catch (error) {
        console.log(`Error fetching tasks => ${error}`)
        return false
    }
}