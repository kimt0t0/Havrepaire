import type { ObjectId } from "mongodb";
import { deleteUserUtil, updateUserUtil } from "@/utils/users.utils";
import type { UpdateUser } from "@/interfaces/UpdateUser.interface"
import type { User } from "@/interfaces/User.interface"
import type { DeleteUser } from "@/interfaces/DeleteUser.interface";
import { useAuth } from "./auth.composable";

export const useUsers = () => {

    const updateUser = async (userId: ObjectId | string | void, formData: UpdateUser): Promise<User | void> => {
        try {
            const updatedUser = await updateUserUtil(userId, formData);
            return updatedUser;
        } catch (e) {
            console.error(`Oups, il y a eu une erreur lors de la tentative de mise-à-jour du compte.`);
        }
    }

    const deleteUser = async (userId: string | undefined, formData: DeleteUser): Promise<void> => {
        try {
            await deleteUserUtil(userId, formData);
            useAuth().signoutUser();
        } catch (e) {
            console.error(`Oups, il y a eu une erreur lors de la tentative de suppression du compte.`);
        }
    }

    return {
        updateUser,
        deleteUser
    }

}