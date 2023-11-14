<script setup lang="ts"></script>

<template>
    <div class="welcome-container">
        <h2 class="welcome-title">
            Bienvenu·e au <strong><img class="welcome-picture" src="@/assets/logo-purple.webp"
                    alt="Cabane troglodyte confortable" />avrepaire</strong>
        </h2>

        <p class="welcome-subtext">- un blogue d'écriture imaginaire !</p>
    </div>
</template>

<style lang="scss" scoped>
@use '@/styles/theme.scss' as *;

.welcome-container {
    margin-top: -$space-xxl;
    margin-bottom: $space-xl;
    box-sizing: border-box;
    min-height: 420px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    background-image: url('@/assets/images/shed.jpeg');
    background-size: cover;
    cursor: pointer;

    &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: color($dark, 50);
        opacity: 0.20;
    }

    @media (max-width: $bp-xs) {
        min-height: 460px;
    }
}

.welcome-picture {
    width: 60px;
    height: 60px;
}

.welcome-title {
    position: absolute;
    z-index: 1;
    top: 0;
    opacity: 0.95;
    box-sizing: border-box;
    max-width: 580px;
    height: 400px;
    margin: 0;
    padding: 18px 0;
    color: color($success, 55);
    font-size: $txt-xxxl;
    font-weight: 500;
    text-align: center;
    white-space: pre-line;
    display: flex;
    justify-content: center;
    align-content: space-between;
    flex-wrap: wrap;

    >strong {
        display: flex;
        align-items: center;
        font-weight: 600;
        color: color($primary, 60);
    }

    @media (max-width: $bp-xs) {
        font-size: $txt-xxl;
    }
}

.welcome-subtext {
    font-weight: 400;
    color: color($primary, 65);
    text-align: center;
}

/* Animated elements */
//todo: add fiction characters popping on the picture when illustrator has replied to my email
</style>