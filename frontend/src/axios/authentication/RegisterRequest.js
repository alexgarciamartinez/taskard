import axios from "axios"

const backendUrl = "http://localhost:8080"

export default async function registerRequest(body) {
    try {
        const response = axios.post(
            `${backendUrl}/api/user/register`,
            body
        )

        if (response.status === 201) {
            console.log("Valid access request!")
            return true
        }
    } catch (error) {
        console.log(`Error => ${error}`)
        return false
    }
    return false
}