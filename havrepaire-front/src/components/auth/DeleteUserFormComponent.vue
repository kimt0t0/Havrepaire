<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { validateEmail, validatePassword } from '@/validators/auth-validators.validators';
import { ButtonSizes } from '@/enums/button-sizes.enum';
import { ButtonStyles } from '@/enums/button-styles.enum';
import { ButtonTypes } from '@/enums/button-types.enum';
import { ButtonStates } from '@/enums/button-states.enum';
import { useUsers } from '@/composables/users.composable';

const props = defineProps({
    userId: String || undefined
});

const { userId } = toRefs(props);

// Handle show/hide password
const showPassword = ref<boolean>(false);

const toggleShowPassword = (): void => {
    showPassword.value = !showPassword.value;
};

const deleteUserFormData = reactive<any>({});

// Delete user
const deleteUser = (e: Event) => {
    e.preventDefault();
    useUsers().deleteUser(userId?.value, deleteUserFormData);
    useRouter().push('/connexion');
};

</script>

<template>
    <form v-if="userId" class="account-form" @submit="deleteUser($event)">
        <h3 class="account-form-title">Supprimer mon compte</h3>
        <!-- Email -->
        <div class="edit-user-data-group">
            <InputGroupParticle label="Adresse email (obligatoire):" inputName="email" color="admin">
                <input class="ig-input __admin delete-user-input" type="email" id="email" name="email"
                    v-model="deleteUserFormData.userEmail" @change="validateEmail(deleteUserFormData.userEmail)" />
            </InputGroupParticle>
        </div>
        <!-- Password -->
        <InputGroupParticle label="Mot de passe (obligatoire):" inputName="password" color="admin">
            <div class="input-line">
                <input class="ig-input __admin delete-user-input" :type="showPassword ? 'text' : 'password'" id="password"
                    name="password" v-model="deleteUserFormData.userPassword"
                    @change="validatePassword(deleteUserFormData.userPassword)" />
                <ButtonParticle :type="ButtonTypes.BUT" :style="ButtonStyles.AD" color="admin" @click="toggleShowPassword">
                    {{ showPassword
                        ? 'X' : 'O' }}</ButtonParticle>
            </div>
        </InputGroupParticle>
        <!-- Submit button -->
        <div class="delete-user-submit-container">
            <ButtonParticle :type="ButtonTypes.SUB" :style="ButtonStyles.AD" :size="ButtonSizes.BIG"
                :state="deleteUserFormData.userPassword?.length >= 8 && deleteUserFormData.userEmail?.length > 8 ? ButtonStates.CL : ButtonStates.DA">
                Confirmer la suppression
            </ButtonParticle>
        </div>
    </form>
</template>

<style lang="scss">
@use '@/styles/theme.scss' as *;

.delete-user-input {
    border-width: 2px;
}

.delete-user-submit-container {
    padding-top: $space-s;

    @media (max-width: $bp-s) {
        display: flex;
        justify-content: center;
    }
}
</style>