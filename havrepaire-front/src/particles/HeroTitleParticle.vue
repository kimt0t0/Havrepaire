<script setup lang="ts">
import { FlexPositions } from '@/enums/flex-positions.enum';

defineProps<{
    normalText?: string;
    highlightedText?: string;
    textColor?: string; // if not default choose 'light'
    highlightColor?: string; // if not default choose 'admin' or 'success'
    position?: FlexPositions;
}>();
</script>

<template>
    <div class="hero-title-container">
        <h1 :class="'hero-title' + ' __position-' + position + ' __color-' + textColor">
            {{ normalText }}&nbsp;<span
                :class="'ht-highlighted-text __color-' + highlightColor + ' __color-' + textColor">{{ highlightedText
                }}</span>
        </h1>
    </div>
</template>

<style lang="scss">
@use '@/styles/theme.scss' as *;

.hero-title-container {
    padding: $space-m 0;

    .hero-title {
        padding: $space-xs 0;
        font-size: $txt-xl;
        font-weight: 800;
        line-height: 1.2;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        &.__position-centered {
            justify-content: center;
            text-align: center;
        }

        &.__position-end {
            justify-content: flex-end;
        }

        &.__color-light {
            color: color($light, 50);
        }

        .ht-highlighted-text {
            @include highlight;

            &.__color-admin {
                @include highlight($color: color($secondary, 85));
            }

            &.__color-success {
                @include highlight($color: color($success, 48));
            }

            &.__color-light {
                color: color($light, 50);
            }
        }
    }
}
</style>