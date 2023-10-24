<script setup lang="ts">
import { LinkStyles } from '@/enums/link-styles.enum';
import { LinkTypes } from '@/enums/link-types.enum';

defineProps<{
    path: string;
    title: string;
    style: LinkStyles;
    type: LinkTypes;
    admin?: boolean;
    blankTarget?: boolean;
}>();

</script>

<template>
    <!-- routerlink -->
    <RouterLink v-if="type === LinkTypes.RL" :to="path"
        :class="(style === LinkStyles.LINK ? 'classic-link' : 'button-link') + (admin ? ' __admin' : '')">
        {{ title }}
    </RouterLink>
    <!-- classic link -->
    <a v-if="type === LinkTypes.CL" :to="path" :title="title"
        :class="(style === LinkStyles.LINK ? 'classic-link' : 'button-link') + (admin ? ' __admin' : '')"
        :target="blankTarget ? '_blank' : ''">
        {{ title }}
    </a>
</template>

<style lang="scss">
@use '@/styles/theme.scss' as *;

.classic-link {
    color: color($primary, 25);
    text-decoration: none;
    padding: 0 $space-xs $space-xs $space-xs;
    border-bottom: 2px solid color($primary, 25);
    @include transition;

    &.__admin {
        color: color($secondary, 50);
        border-bottom: 2px solid color($secondary, 50);
    }

    &:hover {
        border-bottom: 2px solid transparent;
    }
}

.button-link {
    text-decoration: none;
    @include button;

    &.__admin {
        @include button($color: color($secondary, 50));
    }
}
</style>