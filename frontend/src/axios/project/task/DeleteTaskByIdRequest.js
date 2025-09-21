import axiosInstance from "../../AxiosInstance";

const backendUrl = import.meta.env.VITE_BACKEND_URL

export default async function deleteTaskById(taskId) {
    try {
        const response = await axiosInstance.delete(`${backendUrl}/api/task/delete/${taskId}`)

        console.log(`RESPUESTA DE AXIOS ELIMINAR TARE => ${response.data}`)

        if (response.data.status === 'OK') {
            console.log("Task deleted")
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(`Error in the delete task request => ${error}`)
        return false
    }
}