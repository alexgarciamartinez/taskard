import axiosInstance from "../../AxiosInstance"

const backendUrl = import.meta.env.VITE_BACKEND_URL

export default async function getSprintsByProjectRequest(projectId) {
    try {
        const response = await axiosInstance.get(`${backendUrl}/api/sprint/${projectId}/get-by-project`)

        if (response.data.status === "OK") {
            return response.data.body
        } else {
            return null
        }
    } catch (error) {
        console.log("Error in the get sprints axios request => ", error)
        return null
    }
}