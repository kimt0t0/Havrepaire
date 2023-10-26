<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { useLanguagesStore } from '@/stores/languages.store';
import HeroTitleParticle from '@/particles/HeroTitleParticle.vue';
import LinkParticle from '@/particles/LinkParticle.vue';
import SignupForm from '@/components/auth/SignupFormComponent.vue';
import { Languages } from '@/enums/languages.enum';
import { LinkStyles } from '@/enums/link-styles.enum';
import { LinkTypes } from '@/enums/link-types.enum';
import type AlreadyAuthComponentVue from '@/components/auth/AlreadyAuthComponent.vue';

</script>

<template>
    <div class="classic-container signup-container">
        <AlreadyAuthComponent v-if="useAuthStore().activeUserToken" />
        <div v-else class="signup-page-contents">
            <!-- French title -->
            <HeroTitleParticle v-if="useLanguagesStore().activeLanguage === Languages.FR" normalText="Je"
                highlighted-text="m'inscris !" highlightColor="success" />
            <!-- English title -->
            <HeroTitleParticle v-else normalText="I want to" highlighted-text="signup !" highlightColor="success" />
            <!-- Not registered - French -->
            <LinkParticle v-if="useLanguagesStore().activeLanguage === Languages.FR" path="/connexion"
                title="J'ai déjà un compte" :style="LinkStyles.LINK" :type="LinkTypes.RL" :admin="true" />
            <!-- Not registered - English -->
            <LinkParticle v-else path="/connexion" title="I already have an account" :style="LinkStyles.LINK"
                :type="LinkTypes.RL" :admin="true" />
            <!-- Form -->
            <SignupForm />
        </div>
    </div>
</template>

<style lang="scss">
@use '@/styles/theme.scss' as *;

.signup-container {
    @media (max-width: $bp-m) {
        padding: 0 $space-m;
    }
}
</style>
