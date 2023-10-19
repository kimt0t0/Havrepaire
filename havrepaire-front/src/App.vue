<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from '@/components/NavbarComponent.vue';
</script>

<template>
    <header>
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
        <Navbar />
    </header>

    <RouterView />
</template>