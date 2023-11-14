<script setup lang="ts">
</script>

<template>
    <div class="popular-container">
        <div class="classic-container">
            <!-- Title -->
            <HeroTitleParticle normalText="Textes" highlightedText="populaires" highlightColor="success" />

        </div>

    </div>
</template>

<style lang="scss">
@use '@/styles/theme.scss' as *;

.popular-container {
    background-color: color($primary, 60);
    padding-bottom: $space-xxl;
    position: relative;

    /* animated bubble */
    &:hover {
        &::after {
            content: "";
            width: 50px;
            height: 50px;
            border-radius: $radius-circle;
            position: absolute;
            top: -$space-m;
            right: 40%;
            animation: riseBubble 1800ms linear 1;
        }
    }
}

/* bubble's animation */
@keyframes riseBubble {
    5% {
        background-color: color($primary, 45);
    }

    15% {
        top: -$space-l;
        right: 35%;
    }

    30% {
        top: -$space-xl;
        right: 37%;
    }

    50% {
        top: -space-xxl;
        right: 32%;
        width: 42px;
        height: 42px;
        background-color: color($primary, 54);
    }

    70% {
        top: -$space-xxxl;
        right: 28%;
        width: 34px;
        height: 34px;
        background-color: color($primary, 62);
    }

    80% {
        top: -204px;
        right: 25%;
        width: 36px;
        height: 36px;
        background-color: color($primary, 66);
    }

    90% {
        top: -316px;
        right: 21%;
        width: 24px;
        height: 24px;
        background-color: color($primary, 68);
    }

    100% {
        top: -380px;
        right: 18%;
        width: 18px;
        height: 18px;
        background-color: transparent;
    }

}
</style>