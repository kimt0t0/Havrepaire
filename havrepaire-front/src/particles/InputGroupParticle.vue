<script setup lang="ts">
import { InputTypes } from '@/enums/input-types.enum';

defineProps<{
    label: string;
    subtext?: string;
    inputName: string;
    inputType: InputTypes;
    placeholder?: string;
}>();
</script>

<template>
    <div class="input-group">
        <label class="ig-label" :for="inputName">{{ label }}</label>
        <p v-if="subtext" class="ig-subtext">{{ subtext }}</p>
        <input :type="inputType" :id="inputName" :name="inputName" :placeholder="placeholder" class="ig-input" />
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
    color: color($primary, 20);
    margin: 0 0 $space-xs 0;
    line-height: 1;
}

.ig-input {
    border: 1px solid color($primary, 20);
    background-color: color($primary, 72);
    color: color($primary, 20);
    font-size: $txt-m;
    padding: $space-xxs $space-xs;
    border-radius: $radius-xs;
    width: 200px;

    &:focus {
        background-color: color($primary, 68);
    }
}
</style>