import type { Navlink } from "@/interfaces/navlink.interface";
import { defineStore } from "pinia";

export const useNavStore = defineStore('navigation', () => {
    const navFr: Navlink[] = [
        {
            name: 'Accueil',
            path: '/'
        },
        {
            name: 'A propos',
            path: '/a-propos'
        }
    ]

    const navEn: Navlink[] = [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'About',
            path: '/a-propos'
        }
    ]
})