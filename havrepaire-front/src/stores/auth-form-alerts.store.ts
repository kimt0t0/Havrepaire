import { ref } from "vue";
import { defineStore } from "pinia";
import type { FormFieldAlert } from "@/interfaces/FormFieldAlert.interface";

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

    // SETTERS
    const setUsernameAlert = (alert: FormFieldAlert) => {
        usernameAlert.value = alert;
        console.log(`Nouvelle valeur alerte: ${JSON.stringify(usernameAlert.value)}`)
    }

    const setPasswordAlert = (alert: FormFieldAlert) => {
        passwordAlert.value = alert;
    }

    const setEmailAlert = (alert: FormFieldAlert) => {
        emailAlert.value = alert;
    }

    const setPronounsAlert = (alert: FormFieldAlert) => {
        pronounsAlert.value = alert;
        console.log(`Alerte pronoms: ${JSON.stringify(pronounsAlert.value)}`)
    }

    // RETURN
    return {
        // VARIABLES
        usernameAlert,
        passwordAlert,
        emailAlert,
        pronounsAlert,
        // METHODS
        setUsernameAlert,
        setPasswordAlert,
        setEmailAlert,
        setPronounsAlert,
    }
})