<script setup lang="ts">
import { computed, ref } from 'vue';
import { useArticlesStore } from '@/stores/articles.store';

const focusedIndex = ref<number>(0);
const focusedArticle = computed(() => {
    if (useArticlesStore().recentArticles) return useArticlesStore().recentArticles[focusedIndex.value];
});

const getPreviousItem = (): void => {
    if (focusedIndex.value < 0 || focusedIndex.value > 2) focusedIndex.value = 0;
    switch (focusedIndex.value) {
        case 0:
            focusedIndex.value = 2;
            break;
        case 1:
            focusedIndex.value = 0;
            break;
        case 2:
            focusedIndex.value = 1;
            break;
        default:
            focusedIndex.value = 0;
            break;
    }
}

const getNextItem = (): void => {
    if (focusedIndex.value < 0 || focusedIndex.value > 2) focusedIndex.value = 0;
    switch (focusedIndex.value) {
        case 0:
            focusedIndex.value = 1;
            break;
        case 1:
            focusedIndex.value = 2;
            break;
        case 2:
            focusedIndex.value = 0;
            break;
        default:
            focusedIndex.value = 0;
            break;
    }
}
</script>

<template>
    <div class="classic-container recent-container">
        <!-- Title -->
        <HeroTitleParticle normalText="Textes" highlightedText="récents" />
        <!-- Carousel -->
        <div class="recent-carousel">
            <!-- (button left) -->
            <button class="carousel-button __left" @click="getPreviousItem">
                &lt;</button>
            <!-- (displayed item) -->
            <div class="carousel-central-item">
                <RouterLink :to="'/articles/' + focusedArticle?._id" :title="'Lire le texte ' + focusedArticle?.titleFr"
                    class="carousel-link">
                    <figure class="carousel-figure">
                        <h3 class="carousel-item-title">{{ focusedArticle?.titleFr }}</h3>
                        <!-- <img class="carousel-item-illustration" :src="focusedArticle?.illustration" alt="Illustration du texte" /> -->
                        <figcaption class="carousel-item-text">{{ focusedArticle?.textFr }}</figcaption>
                    </figure>
                </RouterLink>
            </div>
            <!-- (button right) -->
            <button class="carousel-button __right" @click="getNextItem">></button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@/styles/theme.scss' as *;

.recent-container {
    padding: 0 $space-m;
}

.recent-carousel {
    box-sizing: border-box;
    display: flex;
    max-width: 640px;
    height: 280px;
    border-radius: $radius-xs;

    @media (max-width: 820px) {
        width: 100%;
        max-width: 100%;
    }
}

.carousel-button {
    width: $space-xxl;
    min-width: $space-xxl;
    padding: $space-xs $space-s;
    background-color: color($primary, 15);
    color: color($primary, 68);
    font-size: $txt-s;
    border-radius: $radius-xxs;
    border: 2px solid color($primary, 15);
    cursor: pointer;
    @include transition;

    &.__left {
        border-radius: $radius-xs 0 0 $radius-xs;
        box-shadow: 4px 2px 8px color($primary, 15);

        &:hover,
        &:focus {
            box-shadow: 4px 2px 8px color($primary, 5);
        }
    }

    &.__right {
        border-radius: 0 $radius-xs $radius-xs 0;
        box-shadow: 2px 2px 8px color($primary, 15);

        &:hover,
        &:focus {
            box-shadow: 2px 2px 8px color($primary, 5);
        }
    }

    &:hover,
    &:focus {
        border-color: color($primary, 20);
        background-color: color($primary, 50);
        color: color($primary, 10);
    }

}

.carousel-central-item {
    background-color: color($primary, 15);
    min-width: 100%;
    min-height: 98%;
    border-top: 2px solid color($primary, 15);
    border-bottom: 2px solid color($primary, 15);
    box-shadow: 2px 2px 8px color($primary, 10);

    @media (max-width: 820px) {
        min-width: initial;
        max-width: 100%;
        width: auto;
    }

    .carousel-link {
        width: fit-content;
        text-decoration: none;
    }

    .carousel-figure {
        box-sizing: border-box;
        margin: 0;
        padding: $space-l $space-xxl;
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;

        @media (max-width: 820px) {
            max-width: 100%;
            width: auto;
            padding: $space-s;
        }
    }

    .carousel-item-illustration {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        height: auto;
        width: 100%;
        opacity: 0.8;
    }

    .carousel-item-title,
    .carousel-item-text {
        z-index: 1;
        color: color($primary, 70);
        background-color: rgba(65, 84, 144, 0.85);
        padding: $space-xs $space-s;
        border-radius: $radius-xs;
        margin: 0 $space-m;
    }

    .carousel-item-title {
        font-size: $txt-xl;
        font-weight: 800;
    }

    .carousel-item-text {
        font-size: $txt-m;
        max-width: 87%;
        max-height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        @media (max-width: 820px) {
            white-space: initial;
        }
    }

}
</style>