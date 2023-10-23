<script setup lang="ts">
import { InputTypes } from '@/enums/input-types.enum';

defineProps<{
    label: string;
    subtext?: string;
    inputName: string;
    inputType: InputTypes;
}>();
</script>

<template>
    <div class="input-group">
        <label class="ig-label" :for="inputName">{{ label }}</label>
        <p class="ig-subtext">{{ subtext }}</p>
        <input :type="inputType" :id="inputName" :name="inputName" />
    </div>
</template>