import axios from "axios";
import axiosInstance from "../../AxiosInstance";

const backendUrl = import.meta.env.VITE_BACKEND_URL

export default async function acceptInvitationRequest(body) {
    try {
        const response = await axiosInstance.post(`${backendUrl}/api/invitation/accept`,
            body
        )

        if (response.data.status === 'OK') {
            console.log("Invitation accepted")
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(`Error accepting invitation => ${error}`)
        return false
    }
}