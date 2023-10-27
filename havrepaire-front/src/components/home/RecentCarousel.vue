<script setup lang="ts">
import { ref } from 'vue';

const items = [
    {
        illus: '',
        text: 'Texte 1'
    },
    {
        illus: '',
        text: 'Texte 2'
    },
    {
        illus: '',
        text: 'Texte 3 avec un titre vraiment plus long pour vérifier le passage à la ligne'
    },
];

const focusedItemIndex = ref<number>(0);
const focusedItem = ref<{ illus: string, text: string }>(items[focusedItemIndex.value]);

const setFocusedItem = (): void => {
    focusedItem.value = items[focusedItemIndex.value];
}

const getPreviousItem = (): void => {
    if (focusedItemIndex.value < 0 || focusedItemIndex.value > 2) focusedItemIndex.value = 0;
    switch (focusedItemIndex.value) {
        case 0:
            focusedItemIndex.value = 2;
            break;
        case 1:
            focusedItemIndex.value = 0;
            break;
        case 2:
            focusedItemIndex.value = 1;
            break;
        default:
            focusedItemIndex.value = 0;
            break;
    }
    setFocusedItem();
}

const getNextItem = (): void => {
    if (focusedItemIndex.value < 0 || focusedItemIndex.value > 2) focusedItemIndex.value = 0;
    switch (focusedItemIndex.value) {
        case 0:
            focusedItemIndex.value = 1;
            break;
        case 1:
            focusedItemIndex.value = 2;
            break;
        case 2:
            focusedItemIndex.value = 0;
            break;
        default:
            focusedItemIndex.value = 0;
            break;
    }
    setFocusedItem();
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
                <figure class="carousel-figure">
                    <img class="carousel-illustration" :src="focusedItem.illus" alt="Illustration du texte" />
                    <figcaption class="carousel-text">{{ focusedItem.text }}</figcaption>
                </figure>
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
    display: flex;
    max-width: 800px;
    height: 280px;
}

.carousel-button {
    @include button;

    &.__left {
        border-radius: $radius-xs 0 0 $radius-xs;
    }

    &.__right {
        border-radius: 0 $radius-xs $radius-xs 0;
    }
}

.carousel-central-item {
    width: 100%;
    background-color: color($secondary, 92);
}
</style>