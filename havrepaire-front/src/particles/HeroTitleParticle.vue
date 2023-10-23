<script setup lang="ts">
import { FlexPositions } from '@/enums/flex-positions.enum';

defineProps<{
    normalText?: string;
    highlightedText?: string;
    highlightColor?: string;
    position?: FlexPositions;
}>();
</script>

<template>
    <div class="hero-title-container">
        <h1 :class="'hero-title' + ' __position-' + position">
            {{ normalText }}&nbsp;<span :class="'ht-highlighted-text __color-' + highlightColor">{{ highlightedText
            }}</span>
        </h1>
    </div>
</template>

<style lang="scss">
@use '@/styles/theme.scss' as *;

.hero-title-container {
    padding: $space-m 0;

    .hero-title {
        padding: $space-xs $space-s;
        font-size: $txt-xl;
        font-weight: 800;
        line-height: 1.2;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        &.__centered {
            justify-content: center;
        }

        &.__end {
            justify-content: flex-end;
        }

        .ht-highlighted-text {
            @include highlight;

            &.__color-admin {
                @include highlight($color: color($secondary, 85));
            }

            &.__color-success {
                @include highlight($color: color($success, 48));
            }
        }
    }
}
</style>