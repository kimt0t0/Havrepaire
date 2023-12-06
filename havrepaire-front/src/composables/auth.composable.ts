import { authLoginUtil, authSignupUtil, getAuthUserUtil } from "@/utils/auth.utils";
import { useAuthStore } from "@/stores/auth.store";
import { useAuthFormAlertsStore } from "@/stores/auth-form-alerts.store";
import type { Credentials } from "@/interfaces/Credentials.interface";
import type { NewUser } from "@/interfaces/NewUser.interface";
import { FormTypes } from "@/enums/forms/form-types.enum";
import type { User } from "@/interfaces/User.interface";

export const useAuth = () => {

    const signupUser = async (e: Event, newUser: NewUser): Promise<void> => {
        e.preventDefault();
        try {
            await authSignupUtil(newUser);
        } catch (e) {
            console.error(`Oups, erreur lors de la création du compte: ${e}`);
        }
        try {
            const result = await authLoginUtil({ username: newUser.username, password: newUser.password });
            useAuthStore().setActiveUserToken(result.data.access_token);
            useAuthFormAlertsStore().setSignupSuccess({ form: FormTypes.SIGNUP, state: true });
            setTimeout(() => useAuthFormAlertsStore().setSignupSuccess({ form: FormTypes.SIGNUP, state: false }), 5000);
        } catch (e) {
            console.error(`Oups, le nouveau compte n'a pas pu être connecté: ${e}`);
        }
    }

    const loginUser = async (e: Event, credentials: Credentials): Promise<void> => {
        e.preventDefault();
        try {
            const result = await authLoginUtil(credentials);
            useAuthStore().setActiveUserToken(result.data.access_token);
            useAuthFormAlertsStore().setLoginSuccess({ form: FormTypes.LOGIN, state: true });
            setTimeout(() => useAuthFormAlertsStore().setLoginSuccess({ form: FormTypes.LOGIN, state: false }), 5000);
        } catch (e) {
            useAuthFormAlertsStore().setLoginFailure({ form: FormTypes.LOGIN, state: true });
            setTimeout(() => useAuthFormAlertsStore().setLoginFailure({ form: FormTypes.LOGIN, state: false }), 5000);
            console.error(`Oups, erreur d'authentification: ${e}`);
        }
    }

    const getAuthUser = async (): Promise<User | void> => {
        try {
            const result = await getAuthUserUtil();
            return result.data;
        } catch (e) {
            console.error(`Oups, impossible de charger les données de l'utilisateur·ice authentifié·e !`);
        }
    }

    const signoutUser = () => {
        useAuthStore().resetActiveUserToken();
    }

    return {
        signupUser,
        loginUser,
        getAuthUser,
        signoutUser
    }
}