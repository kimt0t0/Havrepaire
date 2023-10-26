<script setup lang="ts">
import { InputTypes } from '@/enums/input-types.enum';

defineProps<{
    label: string;
    subtext?: string;
    inputName?: string;
    inputType?: InputTypes;
    placeholder?: string;
    binding?: string;
    success?: boolean;
}>();
</script>

<template>
    <div class="input-group">
        <label class="ig-label" :for="inputName">{{ label }}</label>
        <p v-if="subtext" class="ig-subtext">{{ subtext }}</p>
        <input v-if="inputType" :type="inputType" :id="inputName" :name="inputName" :placeholder="placeholder"
            :class="success ? 'ig-input __success' : 'ig-input'" :v-model="binding" />
        <slot v-else></slot>
    </div>
</template>

<style lang="scss">
@use '@/styles/theme.scss' as *;

.input-group {
    margin: $space-m 0;
    display: flex;
    flex-direction: column;
}

.ig-label {
    font-size: $txt-m;
    color: color($primary, 20);
    margin: 0 0 $space-xs 0;
    line-height: 1;
}

.ig-text {
    color: color($primary, 20);
    font-size: $txt-s;
}

.ig-subtext {
    font-size: $txt-xs;
    font-weight: 300;
    font-style: oblique;
    margin: 0 0 $space-s 0;
}

.ig-input {
    border: 1px solid color($primary, 20);
    background-color: color($primary, 72);
    color: color($primary, 20);
    font-size: $txt-m;
    padding: $space-xxs $space-xs;
    border-radius: $radius-xs;
    width: 240px;

    &.__password {
        padding: 0;
        display: flex;
        align-items: center;
        border-right: none;
    }

    &.__success {
        color: color($success, 15);
        border-color: color($success, 15);

        >.input-password {
            color: color($success, 15);
        }

        >button {
            color: color($success, 15);
            border-color: color($success, 15);

            &:hover {
                background-color: color($success, 15);
                color: color($light, 50);
            }
        }
    }

    @media (max-width: $bp-m) {
        width: auto;
    }
}
</style>