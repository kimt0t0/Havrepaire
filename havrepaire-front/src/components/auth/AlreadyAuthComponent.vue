<script setup lang="ts">
import DeathcrowComponent from '@/components/css-arts/DeathcrowComponent.vue';
import { FlexPositions } from '@/enums/flex-positions.enum';
import { LinkStyles } from '@/enums/link-styles.enum';
import { LinkTypes } from '@/enums/link-types.enum';
</script>

<template>
    <div class="classic-container already-auth-container">
        <div class="aa-contents">
            <HeroTitleParticle normalText="Vous êtes" highlightedText="authentifié·e !" highlightColor="success" />
            <DeathcrowComponent />
            <div class="already-auth-ctas">
                <LinkParticle path="/" title="Aller à l'accueil" :style="LinkStyles.BUTTON" :type="LinkTypes.RL"
                    :position="FlexPositions.CE" />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use '@/styles/theme.scss' as *;

.already-auth-container {

    @media (max-width: $bp-m) {
        padding: 0 $space-m;
    }

    @media (max-width: $bp-xs) {
        .hero-title {
            justify-content: center;
            text-align: center;
        }
    }
}

.aa-contents {
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.already-auth-ctas {
    margin-top: $space-xl;
    display: flex;
    justify-content: center;
}
</style>