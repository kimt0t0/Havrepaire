<script setup lang="ts">
import LanguageMenu from './LanguageMenuComponent.vue';
import LinkParticle from '@/particles/LinkParticle.vue';
import { LinkStyles } from '@/enums/link-styles.enum';
import { LinkTypes } from '@/enums/link-types.enum';
import { useAuthStore } from '@/stores/auth.store';

const navlinks = [
    {
        name: 'Accueil',
        path: '/'
    },
    {
        name: 'A Propos',
        path: '/a-propos'
    },

]
</script>

<template>
    <div class="navbar">
        <LanguageMenu />
        <LinkParticle v-for="(navlink, index) of navlinks" :key="index" :path="navlink.path" :title="navlink.name"
            :style="LinkStyles.BUTTON" :type="LinkTypes.RL" :admin="false" />
        <ButtonParticle v-if="useAuthStore().activeUserToken">Me déconnecter</ButtonParticle>
        <LinkParticle v-else path="/connexion" title="Connexion" :style="LinkStyles.BUTTON" :type="LinkTypes.RL"
            :admin="true" />
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
}
</style>