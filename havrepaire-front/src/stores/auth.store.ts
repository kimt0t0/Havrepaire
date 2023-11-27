import { defineStore } from "pinia";
import { ref } from "vue";
import type { JwtToken } from "@/interfaces/JwtToken.interface";

export const useAuthStore = defineStore('authentication', () => {
    const activeUserToken = ref<string | null>(localStorage.getItem('authenticatedUser'));

    const setActiveUserToken = (token: JwtToken): void => {
        localStorage.setItem('authenticatedUser', JSON.stringify(token.access_token));
        activeUserToken.value = localStorage.getItem('authenticatedUser');
    }

    const resetActiveUserToken = (): void => {
        localStorage.clear();
        activeUserToken.value = localStorage.getItem('authenticatedUser');
    }

    return {
        activeUserToken,
        setActiveUserToken,
        resetActiveUserToken
    }
})