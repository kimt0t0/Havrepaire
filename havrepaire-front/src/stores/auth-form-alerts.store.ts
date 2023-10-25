import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthFormAlertsStore = defineStore('auth-form-alerts', () => {
    const loginSuccess = ref<boolean>(false);
    const loginFailure = ref<boolean>(false);
    const signupSuccess = ref<boolean>(false);
    const signupFailure = ref<boolean>(false);

    const setLoginSuccess = (val: boolean): void => {
        loginSuccess.value = val;
    }

    const setLoginFailure = (val: boolean): void => {
        loginFailure.value = val;
    }

    const setSignupSuccess = (val: boolean): void => {
        signupSuccess.value = val;
    }

    const setSignupFailure = (val: boolean): void => {
        signupFailure.value = val;
    }

    return {
        // variables
        loginSuccess,
        loginFailure,
        signupSuccess,
        signupFailure,
        // methods
        setLoginSuccess,
        setLoginFailure,
        setSignupSuccess,
        setSignupFailure
    }
})