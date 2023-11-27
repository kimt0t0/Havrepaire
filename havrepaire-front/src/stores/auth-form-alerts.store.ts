import { ref } from "vue";
import { defineStore } from "pinia";
import type { FormFieldAlert } from "@/interfaces/FormFieldAlert.interface";
import type { FormAlert } from "@/interfaces/FormAlert.interface";
import { FormTypes } from "@/enums/forms/form-types.enum";

export const useAuthFormAlertsStore = defineStore('auth-form-alerts', () => {

    // VARIABLES
    const usernameAlert = ref<FormFieldAlert>({
        state: false
    });

    const passwordAlert = ref<FormFieldAlert>({
        state: false
    });

    const emailAlert = ref<FormFieldAlert>({
        state: false
    });

    const pronounsAlert = ref<FormFieldAlert>({
        state: false
    });

    const signupSuccess = ref<FormAlert>({
        form: FormTypes.SIGNUP,
        state: false
    });

    const signupFailure = ref<FormAlert>({
        form: FormTypes.SIGNUP,
        state: false
    });

    const loginSuccess = ref<FormAlert>({
        form: FormTypes.LOGIN,
        state: false
    });

    const loginFailure = ref<FormAlert>({
        form: FormTypes.LOGIN,
        state: false
    });

    // SETTERS
    const setUsernameAlert = (alert: FormFieldAlert) => {
        usernameAlert.value = alert;
    };

    const setPasswordAlert = (alert: FormFieldAlert) => {
        passwordAlert.value = alert;
    };

    const setEmailAlert = (alert: FormFieldAlert) => {
        emailAlert.value = alert;
    };

    const setPronounsAlert = (alert: FormFieldAlert) => {
        pronounsAlert.value = alert;
    };

    const setSignupSuccess = (alert: FormAlert) => {
        signupSuccess.value = alert;
    };

    const setSignupFailure = (alert: FormAlert) => {
        signupSuccess.value = alert;
    };

    const setLoginSuccess = (alert: FormAlert) => {
        signupSuccess.value = alert;
    };

    const setLoginFailure = (alert: FormAlert) => {
        signupSuccess.value = alert;
    };


    // RETURN
    return {
        // VARIABLES
        usernameAlert,
        passwordAlert,
        emailAlert,
        pronounsAlert,
        signupSuccess,
        signupFailure,
        loginSuccess,
        loginFailure,
        // METHODS
        setUsernameAlert,
        setPasswordAlert,
        setEmailAlert,
        setPronounsAlert,
        setSignupSuccess,
        setSignupFailure,
        setLoginSuccess,
        setLoginFailure
    }
})