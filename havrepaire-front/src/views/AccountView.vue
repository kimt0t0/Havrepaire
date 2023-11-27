<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuth } from '@/composables/auth.composable';

const user = useAuth().getAuthUser();

onMounted(() => {
    useAuth().getAuthUser;
});
</script>

<template>
    <main>
        <h1>Mon compte</h1>
        <p>{{ JSON.stringify(user) }}</p>
    </main>
</template>
