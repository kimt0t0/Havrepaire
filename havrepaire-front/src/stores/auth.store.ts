import { defineStore } from "pinia";
import { ref } from "vue";
import type { JwtToken } from "@/interfaces/JwtToken.interface";
import type { User } from "@/interfaces/User.interface";

export const useAuthStore = defineStore('authentication', () => {
    const activeUserToken = ref<JwtToken>();
    const activeUser = ref<User>();

    return {
        activeUserToken,
        activeUser
    }
})