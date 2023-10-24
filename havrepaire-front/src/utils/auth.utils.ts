import axiosInstance from "@/services/api";
import type { Credentials } from "@/interfaces/Credentials.interface";

export const authLoginUtil = (credentials: Credentials): any => {
    return axiosInstance.post('auth/login', credentials);
}