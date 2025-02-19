import axios from "axios"
import { useContext, useEffect } from "react";
import { AuthContext } from "../utils/AuthProvider";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_server_endpoint,
});

function useAxiosSecure() {

    const { logout } = useContext(AuthContext)
    const navigate = useNavigate();
    const error = (msg) => toast.error(msg)


    useEffect(
        () => {
            axiosSecure.interceptors.request.use(
                (config) => {
                    const token = localStorage.getItem("token");
                    config.headers.authorization = `Bearer ${token}`
                    return config;
                },
                (err) => Promise.reject(err)
            );

            // Add a response interceptor
            axiosSecure.interceptors.response.use(
                (response) => response,
                async (err) => {

                    if (err.status === 401 || err.status === 403) {
                        try {
                            await logout()
                            error("Session Expired !")
                            navigate("/login")
                        }
                        catch (err) {
                            error(err.message)
                        }
                    }

                    return Promise.reject(err);
                }
            );
        }, []
    )
    return axiosSecure
}

export default useAxiosSecure