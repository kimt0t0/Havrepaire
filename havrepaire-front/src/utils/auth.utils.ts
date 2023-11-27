import axiosInstance from "@/services/api";
import { jwtDecode } from 'jwt-decode';
import type { Credentials } from "@/interfaces/Credentials.interface";
import type { NewUser } from "@/interfaces/NewUser.interface";
import type { User } from "@/interfaces/User.interface";
import type { JwtToken } from "@/interfaces/JwtToken.interface";
import type { DecodedToken } from "@/interfaces/DecodedToken.interface";

export const authLoginUtil = (credentials: Credentials): Promise<JwtToken> => {
    return axiosInstance.post('auth/login', credentials);
}

export const authSignupUtil = (newUser: NewUser): Promise<User> => {
    return axiosInstance.post('/users', newUser);
}

export const getAuthUserUtil = async (): Promise<User | void> => {
    const userToken = localStorage.getItem('authenticatedUser'); // token is a string with { data: { access_token: ' bidule' } etc etc}
    if (userToken) {
        const decodedToken = jwtDecode<DecodedToken>(userToken);
        console.log(`Header token : ${userToken}`);
        return axiosInstance.get(`/users/${decodedToken._id}`, {
            headers: { 'Authorization': `Bearer ${userToken}` }
        });
    }
}