<script setup lang="ts">
import type { Illustration } from '@/interfaces/Illustration.interface';

const apiUrl = import.meta.env.VITE_API_URL;

defineProps<{
    articleId: string;
    size?: string; // choose small / large / smallFixed / largeFixed
    color?: string; // choose primary / admin / success
    title: string;
    subtext: string;
    illustration?: Illustration;
}>();

const getImage = (filepath: string): string => {
    return new URL(`${apiUrl}${filepath}`, import.meta.env.VITE_API_URL).href;
}

</script>

<template>
    <RouterLink :class="'card-particle-link __size-' + size + ' __color-' + color" :to="'/articles/' + articleId">
        <div class="cp-title-container">
            <h3 class="cp-title">{{ title }}</h3>
        </div>
        <div class="cp-illustration-container">
            <img v-if="illustration" :src="getImage(illustration.filepath)" :alt="'Illustration du texte ' + title"
                class="cp-illustration" />
        </div>
        <div class="cp-subtext-container">
            <p class="cp-subtext">{{ subtext }}</p>
        </div>
    </RouterLink>
</template>

<style lang="scss">
@use '@/styles/theme.scss' as *;

.card-particle-link {
    text-decoration: none;
    width: fit-content;
    height: fit-content;
    box-sizing: border-box;
    height: 240px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 2px solid;
    border-radius: $radius-xs;
    margin: 0 $space-m $space-l 0;
    transition: all 300ms ease-out;

    @media (max-width: 550px) {
        margin: $space-m 0;
    }

    .cp-title-container,
    .cp-subtext-container {
        padding: $space-xs $space-m;
        position: relative;
        z-index: 1;
    }

    .cp-title-container {
        min-height: 40px;
        max-height: 40px;
        display: flex;
        align-items: center;
    }

    .cp-subtext-container {
        min-height: 65px;
        max-height: 65px;
    }

    .cp-title {
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        text-transform: uppercase;
        white-space: nowrap;
    }

    .cp-subtext {
        margin: $space-m 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .cp-illustration-container {
        width: auto;
        background-color: color($primary, 50);
        min-height: 135px;
        max-height: 135px;
        overflow: hidden;

        .cp-illustration {
            display: block;
            margin: auto;
            image-rendering: auto;
        }
    }

    &.__size-small {
        width: 46%;

        @media (max-width: 550px) {
            width: 100%;
        }
    }

    &.__size-smallFixed {
        width: 340px;
        min-width: 340px;
        max-width: 340px;

        @media (max-width: 550px) {
            min-width: initial;
            max-width: initial;
            width: 100%;
        }
    }

    &.__size-large {
        width: 100%;
    }

    &.__size-largeFixed {
        width: 510px;
        min-width: 510px;
        max-width: 510px;
    }

    &.__color-primary {
        border-color: color($primary, 60);

        .cp-title-container,
        .cp-subtext-container {
            background-color: color($primary, 15);
            color: color($primary, 60);
            box-shadow: 0 0 5px 2px color($primary, 10);
        }

        &:hover,
        &:focus {
            box-shadow: 0 0 5px 2px color($primary, 60);
        }
    }

    &.__color-success {
        border-color: color($success, 50);

        .cp-title-container,
        .cp-subtext-container {
            background-color: color($primary, 15);
            color: color($success, 50);
            box-shadow: 0 0 5px 2px color($primary, 10);
        }

        &:hover,
        &:focus {
            box-shadow: 0 0 5px 2px color($success, 50);
        }
    }

}
</style>