import axios from "axios";
import { configs } from "eslint-plugin-react-refresh";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    headers: {
        "Authorization": "",
    }
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token')

        if (token) {
            config.headers.Authorization = "Bearer " + token
        } else {
            config.headers.Authorization = ""
        }

        return config
    },
    (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            Cookies.remove('token')
            window.location.href = '/sign-in'
        }

        return Promise.reject(error)
    }
)

export default axiosInstance