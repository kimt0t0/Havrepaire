import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('authentication', () => {
    const activeUserToken = ref<string | null>(localStorage.getItem('authenticatedUser'));

    const setActiveUserToken = (access_token: string): void => {
        localStorage.setItem('authenticatedUser', access_token);
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