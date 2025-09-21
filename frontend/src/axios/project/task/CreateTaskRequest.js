import axiosInstance from "../../AxiosInstance";

const backendUrl = import.meta.env.VITE_BACKEND_URL

export default async function createTaskRequest(task) {
    try {
        const response = await axiosInstance.post(`${backendUrl}/api/task/create`, task)

        if (response.data.status === 'OK') {
            console.log("Task created")
            return response.data
        } else {
            return false
        }
    } catch (error) {
        console.log(`Error in the create task request => ${error.message}`)
        return false
    }
}