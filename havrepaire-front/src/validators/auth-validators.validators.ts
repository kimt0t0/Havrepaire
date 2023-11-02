import { AlertTypes } from "@/enums/alert-types.enum";
import { useAuthFormAlertsStore } from "@/stores/auth-form-alerts.store";

export const validateUsername = (username: string): void => {
    let regex = /[a-zA-Z0-9\W\_]{3,80}$/;
    if (typeof username !== 'string' || username.length < 3 || username.length > 80 || !regex.test(username)) {
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
    if (typeof password !== 'string' || password.length < 8 || password.length > 60 || !regex.test(password)) {
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

export const validateEmail = (email: string): void => {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== 'string' || email.length < 8 || email.length > 100 || !regex.test(email)) {
        return useAuthFormAlertsStore().setEmailAlert({
            state: true,
            type: AlertTypes.DANGER,
            message: 'Votre email doit être à un format valide. Exemple: pseudomail@nom-de-domaine.com'
        });
    }
    return useAuthFormAlertsStore().setEmailAlert({
        state: true,
        type: AlertTypes.SUCCESS
    });
}

export const validatePronouns = (pronouns: string | undefined): void => {
    let regex = /[a-zA-Z/,\-·+]{2,10}$/;
    if (!pronouns || pronouns.length === 0) {
        return useAuthFormAlertsStore().setPronounsAlert({
            state: false
        })
    }
    if (typeof pronouns !== 'string' || pronouns.length < 2 || pronouns.length > 10 || !regex.test(pronouns)) {
        return useAuthFormAlertsStore().setPronounsAlert({
            state: true,
            type: AlertTypes.DANGER,
            message: 'Vos pronoms doivent contenir 2 à 10 caractères. '
        });
    }
    return useAuthFormAlertsStore().setPronounsAlert({
        state: true,
        type: AlertTypes.SUCCESS
    });
}