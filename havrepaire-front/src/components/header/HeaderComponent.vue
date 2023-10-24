<script setup lang="ts">
import Navbar from './NavbarComponent.vue';
</script>

<template>
    <header class="header">
        <div class="classic-container header-container">
            <h1 class="main-title">
                Le &nbsp;<img alt="Logo du Havrepaire" class="header-logo" src="@/assets/logo.svg" />avrepaire
            </h1>
            <Navbar />

        </div>
    </header>
</template>

<style lang="scss">
@use '@/styles/theme.scss' as *;

.header {
    height: 85px;
    box-shadow: 0 0 5px color($dark, 50);
}

.main-title {
    font-size: $txt-l;
    font-weight: 800;
    line-height: 1;
    margin: 0;
    display: flex;
    align-items: center;
}

.header-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-logo {
    width: $txt-xxl;
    height: $txt-xxl;
}
</style>