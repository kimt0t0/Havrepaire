<script setup lang="ts">
import { ButtonSizes } from '@/enums/button-sizes.enum';
import { ButtonStyles } from '@/enums/button-styles.enum';
import { ButtonTypes } from '@/enums/button-types.enum';
import type { FormAlert } from '@/interfaces/FormAlert.interface';
import { FormTypes } from '@/enums/forms/form-types.enum';
import { useUserFormAlertsStore } from '@/stores/user-form-alerts.store';


defineProps<{
    alert: FormAlert
}>();

const closeAlert = (formType: FormTypes): void => {
    console.log(`form type: ${formType}`);
    switch (formType) {
        case FormTypes.UPDATE:
            useUserFormAlertsStore().setUpdateAlert({
                state: false,
                form: formType
            });
            break;
        case FormTypes.DELETE:
            useUserFormAlertsStore().setDeleteAlert({
                state: false,
                form: formType
            });
            break;
        default:
            console.error('Oups, cette action n\'est pas prévue dans l\'application !');
    }
}
</script>

<template>
    <div class="form-alert">
        <div class="form-alert-header">
            <ButtonParticle :type="ButtonTypes.BUT" :style="ButtonStyles.AD" :size="ButtonSizes.SMA"
                @click="closeAlert(alert.form)">X
            </ButtonParticle>
        </div>
        <p :class="'form-alert-text __' + alert.type">{{ alert.message ? alert.message : 'C\'est fait !' }}</p>
    </div>
</template>

<style lang="scss" scoped>
@use '@/styles/theme.scss' as *;

.form-alert {
    max-width: 400px;
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: color($success, 58);
    margin: 0;
    padding: $space-s $space-m;
    border-radius: $radius-xs;
    background-color: color($success, 58);
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 25%;
    left: 35%;
    z-index: 2;

    &.__danger {
        background-color: color($secondary, 65);
    }

    @media (max-width: $bp-xs) {
        max-width: 100%;
        min-width: 100%;
        top: 10%;
        left: 0;
        right: 0;
    }

    .form-alert-header {
        padding: $space-s 0;
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }

    .form-alert-text {
        font-size: $txt-s;
        font-weight: 600;
        white-space: pre-line;
        color: color($success, 20);
        margin: 0 0 $space-s;

        &.__danger {
            color: color($secondary, 25);
        }
    }
}
</style>