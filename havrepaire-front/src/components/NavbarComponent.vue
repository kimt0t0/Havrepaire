<script setup lang="ts">
const navlinks = [
    {
        name: 'Accueil',
        path: '/'
    },
    {
        name: 'A Propos',
        path: '/a-propos'
    },
    {
        name: 'Inscription',
        path: '/inscription'
    },
    {
        name: 'Connexion',
        path: '/connexion'
    },
    {
        name: 'Mon Compte',
        path: '/mon-compte'
    },
    {
        name: 'Article',
        path: '/articles/test'
    },
    {
        name: 'Nouveau contenu',
        path: '/nouveau-contenu',
    }

]
</script>

<template>
    <div class="navbar">
        <RouterLink v-for="(navlink, index) of navlinks" :key="index" :to="navlink.path" class="navlink">{{ navlink.name }}
        </RouterLink>
    </div>
</template>

<style lang="scss">
.navbar {
    display: flex;

    .navlink {
        margin: 0 8px;
    }
}
</style>