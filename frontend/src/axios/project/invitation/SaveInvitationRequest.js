import axios from "axios";
import axiosInstance from "../../AxiosInstance";

const backendUrl = "http://localhost:8080"

export default async function saveInvitationRequest(body) {

    try {
        const response = await axiosInstance.post(
            `${backendUrl}/api/invitation/create`,
            body
        )

        if (response.data.status === 'OK') {
            return { success: true }
        } else {
            return { success: false }
        }
    } catch (error) {
        console.error(`Error sending invitation =>`, error.response)
        const message = error.response?.data?.message || "Ocurrió un error inesperado";
        return { success: false, message };
    }
}