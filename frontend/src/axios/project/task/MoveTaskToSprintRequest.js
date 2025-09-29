import axiosInstance from "../../AxiosInstance";

const backendUrl = import.meta.env.VITE_BACKEND_URL

export default async function moveTaskToSprintRequest(body) {
    try {
        const response = await axiosInstance.post(`${backendUrl}/api/task/move-task`, body)

        if (response.data.status === "OK") {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(`Error in the moving task request => ${error.message}`)
        return false
    }
}