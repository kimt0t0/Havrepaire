<script setup lang="ts">
import { ref } from 'vue';

const items = [
    {
        id: 1,
        illus: 'https://i.pinimg.com/originals/72/e1/be/72e1be8b2b0af7d7ec122cdfe9162341.jpg',
        title: 'Texte 1',
        text: 'Je suis le texte n°1.'
    },
    {
        id: 2,
        illus: 'https://cdn.thedesigninspiration.com/wp-content/uploads/2010/12/Dream-l.jpg',
        title: 'Texte 2',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        id: 3,
        illus: 'https://3.bp.blogspot.com/-mYXkrhKQrNw/WMbF2Fa3l9I/AAAAAAAAB8o/UUckx_TLwI8In3yEcSV-OS4CS90m5jdEwCPcB/s1600/Kyoto%2BJapan%2BJapanese%2Bautumn%2Bcolours.JPG',
        title: 'Texte 3 avec un titre plus long hahah',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
];

const focusedItemIndex = ref<number>(0);
const focusedItem = ref<{ id: number, illus: string, title: string, text: string }>(items[focusedItemIndex.value]);

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
                <RouterLink :to="'/articles/' + focusedItem.id" :title="'Lire le texte ' + focusedItem.title"
                    class="carousel-link">
                    <figure class="carousel-figure">
                        <h3 class="carousel-item-title">{{ focusedItem.title }}</h3>
                        <img class="carousel-item-illustration" :src="focusedItem.illus" alt="Illustration du texte" />
                        <figcaption class="carousel-item-text">{{ focusedItem.text }}</figcaption>
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
}

.carousel-button {
    @include button;
    width: $space-xxl;
    min-width: $space-xxl;

    @media (max-width: $bp-xs) {
        width: initial;
    }

    &.__left {
        border-radius: $radius-xs 0 0 $radius-xs;
        box-shadow: 4px 2px 8px color($primary, 15);
    }

    &.__right {
        border-radius: 0 $radius-xs $radius-xs 0;
        box-shadow: 2px 2px 8px color($primary, 15);
    }
}

.carousel-central-item {
    background-color: color($primary, 70);
    min-width: 100%;
    min-height: 98%;
    border-top: 2px solid color($primary, 25);
    border-bottom: 2px solid color($primary, 25);
    box-shadow: 2px 2px 8px color($primary, 15);

    @media (max-width: $bp-xs) {
        width: auto;

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
    }

}
</style>