<script setup lang="ts">
import LanguageMenu from './LanguageMenuComponent.vue';
import { useLanguagesStore } from '@/stores/languages.store';
import { Languages } from '@/enums/languages.enum';
import LinkParticle from '@/particles/LinkParticle.vue';
import { LinkStyles } from '@/enums/link-styles.enum';
import { LinkTypes } from '@/enums/link-types.enum';
import { useAuthStore } from '@/stores/auth.store';

const navlinksFr = [
    {
        name: 'Accueil',
        path: '/'
    },
    {
        name: 'A Propos',
        path: '/a-propos'
    },

]

const navlinksEn = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'About',
        path: '/a-propos'
    }
]
</script>

<template>
    <div class="navbar">
        <LanguageMenu />
        <!-- French links -->
        <LinkParticle v-if="useLanguagesStore().activeLanguage === Languages.FR" v-for="(navlink, index) of navlinksFr"
            :key="index" :path="navlink.path" :title="navlink.name" :style="LinkStyles.BUTTON" :type="LinkTypes.RL"
            :admin="false" />
        <!-- English links -->
        <LinkParticle v-if="useLanguagesStore().activeLanguage === Languages.EN" v-for="(navlink, index) of navlinksEn"
            :key="index" :path="navlink.path" :title="navlink.name" :style="LinkStyles.BUTTON" :type="LinkTypes.RL"
            :admin="false" />
        <ButtonParticle v-if="useAuthStore().activeUserToken" @click="useAuthStore().resetActiveUserToken">{{
            useLanguagesStore().activeLanguage === Languages.FR ?
            'Me déconnecter' : 'Disconnect' }}</ButtonParticle>
        <LinkParticle v-else path="/connexion"
            :title="useLanguagesStore().activeLanguage === Languages.FR ? 'Connexion' : 'Login'" :style="LinkStyles.BUTTON"
            :type="LinkTypes.RL" :admin="true" />
    </div>
</template>

<style lang="scss">
@use '@/styles/theme.scss' as *;

.navbar {
    display: flex;
    justify-content: space-between;

    .button-link {
        margin: 0 $space-s;
    }

    @media (max-width: $bp-xs) {
        width: 100%;
        flex-direction: column;

        .button-link {
            margin: $space-s 0;
        }
    }
}
</style>