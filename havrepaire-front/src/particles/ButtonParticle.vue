<script setup lang="ts">
import { FlexDirections } from '@/enums/flex-directions.enum';
import { FlexPositions } from '@/enums/flex-positions.enum';
import { ButtonSizes } from '@/enums/button-sizes.enum';
import { ButtonStates } from '@/enums/button-states.enum';
import { ButtonStyles } from '@/enums/button-styles.enum';
import { ButtonTypes } from '@/enums/button-types.enum';

defineProps<{
    type?: ButtonTypes;
    style?: ButtonStyles;
    direction?: FlexDirections;
    position?: FlexPositions;
    size?: ButtonSizes;
    state?: ButtonStates;
}>();
</script>

<template>
    <button :type="type ? type : 'submit'"
        :class="(style === ButtonStyles.AD ? 'button-admin' : 'button-classic') + ' __' + direction + ' __' + position + ' __' + size + ' __' + ' __' + state"
        :disabled="state === ButtonStates.DA ? true : false">
        <slot></slot>
    </button>
</template>

<style lang="scss">
@use '@/styles/theme.scss' as *;

.button-classic {
    @include button($color: color($primary, 25));
}

.button-admin {
    @include button($color: color($secondary, 50));
}
</style>
