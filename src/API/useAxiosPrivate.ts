import { useUser } from "../Context/useUser";
import { axiosPrivate } from "./constants";
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";
import axios from "axios";

export const useAxiosPrivate = () => {
    const { accessToken, updateAccessToken } = useUser();
    const refresh = useRefreshToken();

    useEffect(() => {
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers.Authorization)
                    config.headers.Authorization = `Bearer ${accessToken}`;
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                const originalRequest = error.config;

                if (axios.isCancel(error)) {
                    return Promise.reject(error);
                }

                // if access token is expired
                // then refresh the access token
                // and retry the original request
                if (error?.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    const res = await refresh();

                    const newToken = res.data.results.accessToken;

                    updateAccessToken(newToken);

                    // axiosPrivate.defaults.headers.common[
                    //     "Authorization"
                    // ] = `Bearer ${res.data.accessToken}`;

                    originalRequest.headers.Authorization = `Bearer ${newToken}`;

                    return axiosPrivate(originalRequest);
                }
                return Promise.reject(error);

            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor);
            axiosPrivate.interceptors.response.eject(responseInterceptor);
        };
    }, [accessToken, refresh, updateAccessToken]);

    return axiosPrivate;
};
