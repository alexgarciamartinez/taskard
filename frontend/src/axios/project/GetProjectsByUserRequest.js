import axios from "axios";
import axiosInstance from "../AxiosInstance";

const backendUrl = "http://localhost:8080"

export default async function getProjectsByUser() {
    try {
        const response = await axiosInstance.get(
            `${backendUrl}/api/project/get-by-user`
        )

        if (response.data.status === 'OK') {
            console.log("Projects fetched!")
            return response.data.body
        } else {
            return false
        }

    } catch (error) {
        console.log(`Error while fetching projects ${error.message}`)
        return false
    }
}