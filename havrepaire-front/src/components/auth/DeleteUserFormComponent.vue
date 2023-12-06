<script setup lang="ts">
import { ref } from 'vue';
import { ButtonSizes } from '@/enums/button-sizes.enum';
import { ButtonStyles } from '@/enums/button-styles.enum';
import { ButtonTypes } from '@/enums/button-types.enum';
import type { ObjectId } from 'mongodb';
import { ButtonStates } from '@/enums/button-states.enum';

defineProps<{
    userId: ObjectId | string | void;
}>();

// Check deletion requirements
const isPasswordChecked = ref<boolean>(false);
const isEmailChecked = ref<boolean>(false);

const checkPassword = () => {
    console.log('Check if user entered strong password');
};

const checkEmail = () => {
    console.log('Check if user entered a correct email address');
};

// Delete user
const deleteUser = (e: Event) => {
    e.preventDefault();
    console.log('Suppression de l\'utilisateur·ice...');
};

</script>

<template>
    <form v-if="userId" class="account-form" @submit="deleteUser($event)">
        <h3 class="account-form-title">Supprimer mon compte</h3>
        <ButtonParticle :type="ButtonTypes.SUB" :style="ButtonStyles.AD" :size="ButtonSizes.BIG"
            :state="isPasswordChecked && isEmailChecked ? ButtonStates.CL : ButtonStates.DA">Confirmer la suppression
        </ButtonParticle>
    </form>
</template>

<style lang="scss">
@use '@/styles/theme.scss' as *;
</style>