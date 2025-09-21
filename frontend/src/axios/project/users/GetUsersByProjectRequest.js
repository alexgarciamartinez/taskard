import axiosInstance from "../../AxiosInstance";

const backendUrl = import.meta.env.VITE_BACKEND_URL

export default async function getUsersByProjectId(projectId) {
    try {
        const response = await axiosInstance.get(`${backendUrl}/api/user/get-by-project/${projectId}`)

        if (response.data.status === 'OK') {
            console.log("Users fetched!")
            return response.data.body
        } else {
            return false
        }
    } catch (error) {
        console.log(`Error in the get users request => ${error}`)
        return null
    }
}