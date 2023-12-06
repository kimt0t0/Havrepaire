import axiosInstance from "@/services/api";
import { jwtDecode } from "jwt-decode";
import type { ObjectId } from "mongodb";
import type { User } from "@/interfaces/User.interface";
import type { UpdateUser } from "@/interfaces/UpdateUser.interface";
import type { DeleteUser } from "@/interfaces/DeleteUser.interface";
import type { DecodedToken } from "@/interfaces/DecodedToken.interface";
import { Role } from "@/enums/users/role.enum";

export const updateUserUtil = (userId: ObjectId | string | void, formData: UpdateUser): Promise<User> | void => {
    if (!userId) return console.error('Aucun identifiant n\'a été fourni pour mettre le compte à jour.');
    const userToken = localStorage.getItem('authenticatedUser'); // token is a string with { data: { access_token: ' bidule' } etc etc}
    console.log(`user token: ${userToken}`);
    if (!userToken) {
        return console.error('Aucun jeton d\'identification trouvé');
    }
    const decodedToken = jwtDecode<DecodedToken>(userToken);
    console.log(`decoded token: ${JSON.stringify(decodedToken)}`);
    if (decodedToken._id.toString() !== userId.toString() && decodedToken.role !== Role.ADMIN) {
        return console.error('Vous n\'êtes pas autorisé·e à effectuer cette action !');
    }
    console.log(`Envoi de la requête à l'adresse '/users/${userId.toString()}'`)
    return axiosInstance.patch(`/users/${decodedToken._id}`, formData);
}

export const deleteUserUtil = (userId: ObjectId | string | void, formData: DeleteUser): Promise<User> | void => {
    if (!userId) return console.error('Aucun identifiant n\'a été fourni pour mettre le compte à jour.');
    const userToken = localStorage.getItem('authenticatedUser'); // token is a string with { data: { access_token: ' bidule' } etc etc}
    if (!userToken) {
        return console.error('Aucun jeton d\'identification trouvé');
    }
    const decodedToken = jwtDecode<DecodedToken>(userToken);
    if (decodedToken._id.toString() !== userId.toString() && decodedToken.role !== Role.ADMIN) {
        return console.error('Vous n\'êtes pas autorisé·e à effectuer cette action !');
    }
    return axiosInstance.delete(`/users/${userId.toString()}`, { data: formData });

}