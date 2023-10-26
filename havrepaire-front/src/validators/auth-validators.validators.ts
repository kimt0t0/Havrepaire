import { AlertTypes } from "@/enums/alert-types.enum";
import { useAuthFormAlertsStore } from "@/stores/auth-form-alerts.store";

export const validateUsername = (username: string): void => {
    console.log(`checking username: ${username}`);
    if (typeof username !== 'string' || username.length < 3 || username.length > 79) {
        return useAuthFormAlertsStore().setUsernameAlert({
            state: true,
            type: AlertTypes.DANGER,
            message: 'Votre pseudonyme doit contenir 3 à 80 caractères, qui peuvent inclure des caractères alphanumériques et/ou des caractères spéciaux.'
        })
    }
    return useAuthFormAlertsStore().setUsernameAlert({
        state: true,
        type: AlertTypes.SUCCESS
    });
}

export const validatePassword = (password: string): void => {
    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W\_])[a-zA-Z0-9\W\_]{8,60}$/;
    // TODO: add check with regex
    if (typeof password !== 'string' || password.length < 8 || password.length > 59 || !regex.test(password)) {
        return useAuthFormAlertsStore().setPasswordAlert({
            state: true,
            type: AlertTypes.DANGER,
            message: 'Votre mot-de-passe doit contenir 8 à 60 caractères et être un mot-de-passe fort (lettres majuscules et minuscules, chiffres et caractères spéciaux sont obligatoires).'
        });
    }
    return useAuthFormAlertsStore().setPasswordAlert({
        state: true,
        type: AlertTypes.SUCCESS
    });
}