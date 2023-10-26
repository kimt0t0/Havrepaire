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

    // SETTERS
    const setUsernameAlert = (alert: FormFieldAlert) => {
        usernameAlert.value = alert;
        console.log(`Nouvelle valeur alerte: ${JSON.stringify(usernameAlert.value)}`)
    }

    const setPasswordAlert = (alert: FormFieldAlert) => {
        passwordAlert.value = alert;
    }

    // RETURN
    return {
        // VARIABLES
        usernameAlert,
        passwordAlert,
        // METHODS
        setUsernameAlert,
        setPasswordAlert,
    }
})