<script setup lang="ts">
import { useLanguagesStore } from '@/stores/languages.store';
import HeroTitleParticle from '@/particles/HeroTitleParticle.vue';
import LinkParticle from '@/particles/LinkParticle.vue';
import LoginForm from '@/components/auth/LoginFormComponent.vue';
import { FlexPositions } from '@/enums/flex-positions.enum';
import { Languages } from '@/enums/languages.enum';
import { LinkStyles } from '@/enums/link-styles.enum';
import { LinkTypes } from '@/enums/link-types.enum';

</script>

<template>
    <div class="classic-container login-container">
        <!-- French title -->
        <HeroTitleParticle v-if="useLanguagesStore().activeLanguage === Languages.FR" normalText="Je me"
            highlighted-text="connecte !" highlightColor="success" :position="FlexPositions.CE" />
        <!-- English title -->
        <HeroTitleParticle v-else normalText="I want to" highlighted-text="login !" highlightColor="success"
            :position="FlexPositions.CE" />
        <!-- Not registered - French -->
        <LinkParticle v-if="useLanguagesStore().activeLanguage === Languages.FR" path="/inscription"
            title="Pas encore inscrit·e ?" :style="LinkStyles.LINK" :type="LinkTypes.RL" :admin="false" />
        <!-- Not registered - English -->
        <LinkParticle v-else path="/inscription" title="Not registered yet ?" :style="LinkStyles.LINK" :type="LinkTypes.RL"
            :admin="false" />
        <!-- Form -->
        <LoginForm />
    </div>
</template>

<style lang="scss">
@use '@/styles/theme.scss';
</style>
