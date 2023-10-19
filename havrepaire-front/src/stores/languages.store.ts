import { defineStore } from "pinia";
import { ref } from "vue";
import { Languages } from "@/enums/languages.enum";

export const useLanguagesStore = defineStore('languages', () => {
    const activeLanguage = ref<Languages>(Languages.FR);

    const setLanguage = (lang: Languages): void => {
        activeLanguage.value = lang;
    }

    return {
        activeLanguage,
        setLanguage
    }
})