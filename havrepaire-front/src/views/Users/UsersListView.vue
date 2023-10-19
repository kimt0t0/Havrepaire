<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
    <main>
        <h1>Les lecteurices</h1>
        -><RouterLink to="/lecteurices/test1">Test 1</RouterLink>
        -><RouterLink to="/lecteurices/test2">Test 2</RouterLink>
        <RouterView />
    </main>
</template>
