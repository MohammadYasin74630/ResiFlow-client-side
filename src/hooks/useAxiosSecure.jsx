import axios from "axios"
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_server_endpoint,
});

function useAxiosSecure() {

    useEffect(
        () => {
            // Add a response interceptor
            axiosSecure.interceptors.response.use(function (response) {
                return response;
            }, function (error) {
                return Promise.reject(error);
            });
        }, []
    )
    return axiosSecure
}

export default useAxiosSecure