import axios from "axios";
import axiosInstance from "../AxiosInstance";

const backendUrl = "http://localhost:8080"

export default async function saveProjectRequest(body) {
    try {
        const response = await axiosInstance.post(
            `${backendUrl}/api/project/create`,
            body
        )

        if (response.data.status === 'OK') {
            console.log("Project created")
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(`Error saving project ${error.message}`)
        return false
    }
}