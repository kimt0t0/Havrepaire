<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
    <main>
        <h1>Nouveau contenu</h1>
        -> <RouterLink to="/nouveau-contenu/article">+ article</RouterLink>
        -> <RouterLink to="/nouveau-contenu/illustration">+ illustration</RouterLink>
        <RouterView />
    </main>
</template>
