import axios from "axios";
import axiosInstance from "../../AxiosInstance";

const backendUrl = import.meta.env.VITE_BACKEND_URL

export default async function rejectInvitation(invitationId) {
    try {
        const response = await axiosInstance.delete(`${backendUrl}/api/invitation/reject/${invitationId}`)

        if (response.data?.status === 'OK') {
            console.log("Invitation rejected")
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(`Error rejecting invitation => ${error}`)
    }
}