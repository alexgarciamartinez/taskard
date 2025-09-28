import axiosInstance from "../AxiosInstance";

const backendUrl = "http://localhost:8080"

export default async function registerRequest(body) {
    try {
        const response = await axiosInstance.post(
            `${backendUrl}/api/user/register`,
            body
        )

        if (response.data.status === "OK") {
            console.log("Valid access request!")
            return true
        }
    } catch (error) {
        console.log(`Error => ${error}`)
        return false
    }
    return false
}