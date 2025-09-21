import axios from "axios";
import axiosInstance from "../../AxiosInstance";

const backendUrl = "http://localhost:8080"

export default async function getInvitationsByUserRequest() {
    try {
        const response = await axiosInstance.get(
            `${backendUrl}/api/invitation/get-by-user`
        )

        if (response.data.status === 'OK') {
            console.log("Invitations fetched!")
            return response.data.body
        } else {
            return false
        }
    } catch (error) {
        console.log(`Error fetching invitations => ${error}`)
        return false
    }
}