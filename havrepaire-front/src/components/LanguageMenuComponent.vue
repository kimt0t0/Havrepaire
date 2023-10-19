<script setup lang="ts">
import { ref } from 'vue';
import { useLanguagesStore } from '@/stores/languages.store';
import { Languages } from '@/enums/languages.enum';

const showLanguageDropdown = ref<boolean>(false);

const toggleShowLanguageDropdown = (): void => {
    showLanguageDropdown.value = !showLanguageDropdown.value
}
</script>

<template>
    <aside class="language-menu">
        <div class="lm-contents">
            <button :class="showLanguageDropdown ? 'language-button active' : 'language-button'" type="button"
                @click="toggleShowLanguageDropdown">
                <flag :iso="useLanguagesStore().activeLanguage" />
            </button>
            <div class="language-dropdown" v-if="showLanguageDropdown">
                <button class="ld-button" type="button" v-for="(lang, index) of Languages" :key="index"
                    @click="useLanguagesStore().setLanguage(lang)">
                    <flag :iso="lang" /> {{ lang === Languages.EN ? 'EN' : lang }}
                </button>
            </div>
        </div>
    </aside>
</template>