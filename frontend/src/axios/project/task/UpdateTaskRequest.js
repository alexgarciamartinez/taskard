import axiosInstance from "../../AxiosInstance";

const backendUrl = import.meta.env.VITE_BACKEND_URL

export default async function updateTaskRequest(task) {
    try {
        const response = await axiosInstance.post(`${backendUrl}/api/task/update`, task)

        console.log("RESPUESTA DE AXIOS ACTUALIZAR TAREA =>", response.data);

        if (response.data.status === 'OK') {
            return response.data
        } else {
            console.log(response.data)
            return null
        }
    } catch (error) {
        console.log(`Error in the create task request => ${error.message}`)
        return false
    }
}