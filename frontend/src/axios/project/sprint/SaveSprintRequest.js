import axiosInstance from "../../AxiosInstance";

const backendUrl = import.meta.env.VITE_BACKEND_URL

export default async function saveSprintRequest(sprint) {
    try {
        const response = await axiosInstance.post(`${backendUrl}/api/sprint/create`, sprint)

        if (response.data.status === "OK") {
            return response.data.body
        } else {
            return null
        }
    } catch (error) {
        console.log("Error in the creating sprint axios request => " + error)
    }
}