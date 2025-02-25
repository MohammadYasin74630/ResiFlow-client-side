import axios from "axios"
import { useContext, useEffect } from "react";
import { AuthContext } from "../utils/AuthProvider";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_server_endpoint,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};
function useAxiosSecure() {

    const { user, loading, logout } = useContext(AuthContext)
    const navigate = useNavigate();
    const error = (msg) => toast.error(msg)

    const punishUser = async () => {
        try {
            await logout()
            error("Session Expired !")
            navigate("/login")
        }
        catch (err) {
            error(err.message)
        }
    }


    useEffect(
        () => {
            const reqInterceptor = axiosSecure.interceptors.request.use(
                (config) => {
                    const token = localStorage.getItem("token");
                    config.headers.authorization = `Bearer ${token}`
                    return config;
                },
                (err) => Promise.reject(err)
            );

            // response interceptor
            const resInterceptor = axiosSecure.interceptors.response.use(
                // 200
                async (response) => {

                    // Implemented a global lock (or queue) to prevent multiple token refresh calls at the same
                    if (user && response.data?.error === "jwt expired") {
                        console.log("Refreshing token...")
                        const originalRequest = response.config;

                        if (!originalRequest._retry) {

                            originalRequest._retry = true;

                            if (isRefreshing) {
                                return new Promise((resolve, reject) => {
                                    failedQueue.push({ resolve, reject });
                                })
                                    .then((token) => {
                                        originalRequest.headers.authorization = `Bearer ${token}`;
                                        return axiosSecure(originalRequest);
                                    })
                                    .catch((err) => Promise.reject(err));
                            }

                            isRefreshing = true;

                            try {
                                if (!loading) {
                                    const { data: { token } } = await axiosSecure.post(`/jwt/${user?.email}`);

                                    if (token) {

                                        localStorage.setItem("token", token);

                                        processQueue(null, token)

                                        originalRequest.headers.authorization = `Bearer ${token}`;

                                        return axiosSecure(originalRequest);
                                    }
                                }
                            } catch (refreshError) {
                                processQueue(refreshError, null);
                                punishUser()
                                return Promise.reject(refreshError);
                            } finally {
                                isRefreshing = false;
                            }
                        }
                    }
                    return response
                },
                // 400
                async (err) => {

                    if (err.status === 401 || err.status === 403) {
                        punishUser()
                    }

                    return Promise.reject(err);
                }
            );

            return () => {
                axiosSecure.interceptors.request.eject(reqInterceptor);
                axiosSecure.interceptors.response.eject(resInterceptor);
            };
        }, []
    )
    return axiosSecure
}

export default useAxiosSecure