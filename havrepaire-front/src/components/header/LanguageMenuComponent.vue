<script setup lang="ts">
import { ref } from 'vue';
import { useLanguagesStore } from '@/stores/languages.store';
import { Languages } from '@/enums/languages.enum';

const showLanguageDropdown = ref<boolean>(false);

const toggleShowLanguageDropdown = (): void => {
    console.log('Valeur dropdown avant: ', showLanguageDropdown.value);
    showLanguageDropdown.value = !showLanguageDropdown.value;
    console.log('Valeur dropdown après: ', showLanguageDropdown.value);
}

</script>

<template>
    <aside class="language-menu">
        <div class="lm-contents">
            <button :class="showLanguageDropdown ? 'language-button __active' : 'language-button'" type="button"
                @click="toggleShowLanguageDropdown">
                <flag :iso="useLanguagesStore().activeLanguage" />
            </button>
            <div class="lm-dropdown" v-show="showLanguageDropdown">
                <button :class="useLanguagesStore().activeLanguage === lang ? 'ld-button __active' : 'ld-button'"
                    type="button" v-for="(lang, index) of Languages" :key="index"
                    @click="useLanguagesStore().setLanguage(lang)">
                    <flag :iso="lang" /> {{ lang === Languages.EN ? 'en' : lang }}
                </button>
            </div>
        </div>
    </aside>
</template>

<style lang="scss">
@use '@/styles/theme.scss' as *;

.language-button {
    @include button;
    margin-right: $space-m;

    >.fi {
        border: 1px solid color($light, 50);
        border-radius: $radius-xxs;
    }

    @media (max-width: $bp-xs) {
        margin: $space-s 0;
    }
}

.ld-button {
    @include button;
    width: 80px;
    display: flex;
    align-items: center;
    border-radius: initial;
    background-color: color($light, 50);
    text-transform: capitalize;

    >.fi {
        border: 1px solid color($light, 50);
        border-radius: $radius-xxs;
        margin-right: $space-xs;
    }
}

.lm-contents {
    position: relative;

    .lm-dropdown {
        position: absolute;
        z-index: 1;
        bottom: -$space-xxl;
    }
}
</style>