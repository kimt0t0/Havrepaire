import { defineStore } from "pinia";
import { ref } from "vue";
import { FormTypes } from "@/enums/forms/form-types.enum";
import type { FormAlert } from "@/interfaces/FormAlert.interface";

export const useUserFormAlertsStore = defineStore('user-form-alerts', () => {

    // VARIABLES
    const updateAlert = ref<FormAlert>({
        form: FormTypes.UPDATE,
        state: false
    });

    const deleteAlert = ref<FormAlert>({
        form: FormTypes.DELETE,
        state: false
    });

    // SETTERS
    const setUpdateAlert = (alert: FormAlert) => {
        updateAlert.value = alert;
    };

    const setDeleteAlert = (alert: FormAlert) => {
        deleteAlert.value = alert;
    };

    // EXPORTS
    return {
        // VARIABLES
        updateAlert,
        deleteAlert,
        // SETTERS
        setUpdateAlert,
        setDeleteAlert
    }


});