import axiosInstance from "../AxiosInstance";
import Cookies from "js-cookie";

const backendUrl = "http://localhost:8080"

export default async function signInRequest(body) {
    try {
        const response = await axiosInstance.post(
            `${backendUrl}/api/user/sign-in`,
            body
        )

        if (response.status === 200) {
            const requestBody = JSON.parse(JSON.stringify(response.data))

            Cookies.set('token', requestBody.body, { expires: null, sameSite: 'Strict' })

            console.log("Valid sing in request!")

            return true
        } else {
            if (axios.isAxiosError(error)) {
                console.log("Error =>", error.response?.data || error.message)

                console.log("Status Code =>", error.response?.status)
            } else {
                console.log("Unexpected error =>", error)
            }
            return false 
        }
    } catch (error) {
        console.log(`Error a la hora de loggearse => ${error}`)
        
        return false
    }
}