import { authLoginUtil, authSignupUtil } from "@/utils/auth.utils";
import { useAuthStore } from "@/stores/auth.store";
import { useAuthFormAlertsStore } from "@/stores/auth-form-alerts.store";
import type { Credentials } from "@/interfaces/Credentials.interface";
import type { NewUser } from "@/interfaces/NewUser.interface";

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
            useAuthStore().setActiveUserToken(result);
            useAuthFormAlertsStore().setSignupSuccess(true);
            setTimeout(() => useAuthFormAlertsStore().setSignupSuccess(false), 5000);
        } catch (e) {
            console.error(`Oups, le nouveau compte n'a pas pu être connecté: ${e}`);
        }
    }

    const loginUser = async (e: Event, credentials: Credentials): Promise<void> => {
        e.preventDefault();
        try {
            const result = await authLoginUtil(credentials);
            useAuthStore().setActiveUserToken(result);
            useAuthFormAlertsStore().setLoginSuccess(true);
            setTimeout(() => useAuthFormAlertsStore().setLoginSuccess(false), 5000);
        } catch (e) {
            useAuthFormAlertsStore().setLoginFailure(true);
            setTimeout(() => useAuthFormAlertsStore().setLoginFailure(false), 5000);
            console.error(`Oups, erreur d'authentification: ${e}`);
        }
    }

    return {
        signupUser,
        loginUser
    }
}