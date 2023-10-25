import axiosInstance from "@/services/api";
import type { Credentials } from "@/interfaces/Credentials.interface";
import type { NewUser } from "@/interfaces/NewUser.interface";
import type { User } from "@/interfaces/User.interface";
import type { JwtToken } from "@/interfaces/JwtToken.interface";

export const authLoginUtil = (credentials: Credentials): Promise<JwtToken> => {
    return axiosInstance.post('auth/login', credentials);
}

export const authSignupUtil = (newUser: NewUser): Promise<User> => {
    return axiosInstance.post('/users', newUser);
}