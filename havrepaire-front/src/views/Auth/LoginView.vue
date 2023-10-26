<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { useLanguagesStore } from '@/stores/languages.store';
import LoginForm from '@/components/auth/LoginFormComponent.vue';
import { FlexPositions } from '@/enums/flex-positions.enum';
import { Languages } from '@/enums/languages.enum';
import { LinkStyles } from '@/enums/link-styles.enum';
import { LinkTypes } from '@/enums/link-types.enum';
import AlreadyAuthComponent from '@/components/auth/AlreadyAuthComponent.vue';

</script>

<template>
    <div class="classic-container login-container">
        <AlreadyAuthComponent v-if="useAuthStore().activeUserToken" />
        <div v-else class="login-page-contents">
            <!-- French title -->
            <HeroTitleParticle v-if="useLanguagesStore().activeLanguage === Languages.FR" normalText="Je me"
                highlighted-text="connecte !" highlightColor="success" />
            <!-- English title -->
            <HeroTitleParticle v-else normalText="I want to" highlighted-text="login !" highlightColor="success"
                :position="FlexPositions.CE" />
            <!-- Not registered - French -->
            <LinkParticle v-if="useLanguagesStore().activeLanguage === Languages.FR" path="/inscription"
                title="Pas encore inscrit·e ?" :style="LinkStyles.LINK" :type="LinkTypes.RL" :admin="true" />
            <!-- Not registered - English -->
            <LinkParticle v-else path="/inscription" title="Not registered yet ?" :style="LinkStyles.LINK"
                :type="LinkTypes.RL" :admin="true" />
            <!-- Form -->
            <LoginForm />
        </div>
    </div>
</template>

<style lang="scss">
@use '@/styles/theme.scss' as *;

.login-container {
    padding: 0 $space-m;
}
</style>
