<script setup lang="ts">
import { InputTypes } from '@/enums/input-types.enum';

defineProps<{
    label: string;
    subtext?: string;
    inputName?: string;
    inputType?: InputTypes;
    placeholder?: string;
    binding?: string;
    color?: string; //choose success or admin
}>();
</script>

<template>
    <div class="input-group">
        <label :class="'ig-label __' + color" :for="inputName">{{ label }}</label>
        <p v-if="subtext" class="ig-subtext">{{ subtext }}</p>
        <input v-if="inputType" :type="inputType" :id="inputName" :name="inputName" :placeholder="placeholder"
            :class="'ig-input __' + color" :v-model="binding" />
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

    &.__admin {
        color: color($secondary, 45);
    }
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

    &.__admin {
        color: color($secondary, 15);
        border-color: color($secondary, 50);

        >.input-password {
            color: color($success, 15);
        }

        >button {
            color: color($secondary, 15);
            border-color: color($secondary, 50);

            &:hover {
                background-color: color($secondary, 50);
                color: color($secondary, 15);
            }
        }
    }

    @media (max-width: $bp-m) {
        width: auto;
    }

    @media (max-width: $bp-xs) {
        width: 100%;
    }
}
</style>@/enums/forms/input-types.enum