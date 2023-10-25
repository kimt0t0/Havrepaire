import { defineStore } from "pinia";
import { ref } from "vue";
import type { JwtToken } from "@/interfaces/JwtToken.interface";

export const useAuthStore = defineStore('authentication', () => {
    const activeUserToken = ref<JwtToken>();

    const setActiveUserToken = (token: JwtToken): void => {
        activeUserToken.value = token;
    }

    const resetActiveUserToken = (): void => {
        console.log('reset token...')
        activeUserToken.value = undefined;
    }

    return {
        activeUserToken,
        setActiveUserToken,
        resetActiveUserToken
    }
})