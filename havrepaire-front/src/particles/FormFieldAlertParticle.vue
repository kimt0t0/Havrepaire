<script setup lang="ts">
import { AlertTypes } from '@/enums/forms/alert-types.enum';
import type { FormFieldAlert } from '@/interfaces/FormFieldAlert.interface';

defineProps<{
    alert: FormFieldAlert
}>();
</script>

<template>
    <p v-if="alert.type === AlertTypes.DANGER" class="form-field-alert">{{ alert.message }}</p>
</template>

<style lang="scss" scoped>
@use '@/styles/theme.scss' as *;

.form-field-alert {
    font-size: $txt-xs;
    font-weight: 600;
    color: color($secondary, 35);
    margin: $space-xs 0;
    max-width: 100%;
    white-space: pre-line;
}
</style>