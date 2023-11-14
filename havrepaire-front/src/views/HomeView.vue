<script setup lang="ts">
import PopularComponent from '@/components/home/PopularComponent.vue';
import RecentCarouselComponent from '@/components/home/RecentCarouselComponent.vue';
import WelcomeComponent from '@/components/home/WelcomeComponent.vue';


</script>

<template>
    <div class="homeview-contents">
        <!-- Welcome -->
        <WelcomeComponent />
        <!-- Recent Texts -->
        <RecentCarouselComponent />
        <!-- Popular -->
        <PopularComponent />
    </div>
</template>
