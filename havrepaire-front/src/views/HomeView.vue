<script setup lang="ts">
import { onMounted } from 'vue';
import { useArticlesStore } from '@/stores/articles.store';
import ArticlesListComponent from '@/components/home/ArticlesListComponent.vue';
import PopularComponent from '@/components/home/PopularComponent.vue';
import RecentCarouselComponent from '@/components/home/RecentCarouselComponent.vue';
import WelcomeComponent from '@/components/home/WelcomeComponent.vue';

onMounted(() => {
    useArticlesStore().getArticles();
});


</script>

<template>
    <div class="homeview-contents">
        <!-- Welcome -->
        <WelcomeComponent />
        <!-- Recent Texts -->
        <RecentCarouselComponent />
        <!-- Popular -->
        <PopularComponent />
        <!-- List -->
        <ArticlesListComponent />
    </div>
</template>
