<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuth } from '@/composables/auth.composable';
import { useAuthFormAlertsStore } from "@/stores/auth-form-alerts.store";
import { validateUsername, validatePassword, validateEmail, validatePronouns } from '@/validators/auth-validators.validators';
import type { NewUser } from '@/interfaces/NewUser.interface';
import { AlertTypes } from '@/enums/forms/alert-types.enum';
import { ButtonSizes } from '@/enums/button-sizes.enum';
import { ButtonStyles } from '@/enums/button-styles.enum';
import { ButtonTypes } from '@/enums/button-types.enum';
import { InputTypes } from '@/enums/forms/input-types.enum';

const { signupUser } = useAuth();

const showPassword = ref<boolean>(false);
const toggleShowPassword = (): void => {
    showPassword.value = !showPassword.value;
}

const signupFormData = reactive<NewUser>({
    username: "",
    password: "",
    email: "",
    gender: undefined,
    pronouns: ''
});

</script>

<template>
    <form class="signup-form" @submit="signupUser($event, signupFormData)">
        <!-- Username -->
        <InputGroupParticle label="Pseudonyme" inputName="username" color="admin">
            <input :type="InputTypes.TEXT" name="username" id="username" placeholder="Psudonim"
                v-model="signupFormData.username"
                :class="useAuthFormAlertsStore().usernameAlert.type === AlertTypes.SUCCESS ? 'ig-input __success' : 'ig-input'"
                @change="validateUsername(signupFormData.username)" required />
            <FormFieldAlertParticle :alert="useAuthFormAlertsStore().usernameAlert" />
        </InputGroupParticle>
        <!-- Password -->
        <InputGroupParticle label="Mot-de-passe" inputName="password" color="admin">
            <div
                :class="useAuthFormAlertsStore().passwordAlert.type === AlertTypes.SUCCESS ? 'ig-input __password __success' : 'ig-input __password'">
                <input :type="showPassword ? InputTypes.TEXT : InputTypes.PASS" name="password" id="password"
                    placeholder="MotDePasse" v-model="signupFormData.password" class="input-password"
                    @change="validatePassword(signupFormData.password)" required />
                <button type="button" class="password-button" @click="toggleShowPassword">{{ showPassword ? 'X' : 'O'
                }}</button>
            </div>
            <FormFieldAlertParticle :alert="useAuthFormAlertsStore().passwordAlert" />
        </InputGroupParticle>
        <!-- Email -->
        <InputGroupParticle label="Adresse mail" inputName="email">
            <input :type="InputTypes.EMAIL" name="email" id="email" placeholder="psudonim@mailtruc.com"
                v-model="signupFormData.email"
                :class="useAuthFormAlertsStore().emailAlert.type === AlertTypes.SUCCESS ? 'ig-input __success' : 'ig-input'"
                @change="validateEmail(signupFormData.email)" required />
            <FormFieldAlertParticle :alert="useAuthFormAlertsStore().emailAlert" />
        </InputGroupParticle>
        <!-- Gender -->
        <h3 class="ig-label">Genre</h3>
        <p class="ig-subtext">(Champ facultatif)</p>
        <div class="radio-input-line">
            <input type="radio" id="male" value="m" v-model="signupFormData.gender" />
            <label class="ig-text" for="male">Masculin</label>
        </div>
        <div class="radio-input-line">
            <input type="radio" id="female" value="f" v-model="signupFormData.gender" />
            <label class="ig-text" for="female">Féminin</label>
        </div>
        <div class="radio-input-line">
            <input type="radio" id="non-binary" value="n" v-model="signupFormData.gender" />
            <label class="ig-text" for="non-binary">Non-binaire / Non-précisé</label>
        </div>
        <!-- Pronouns -->
        <InputGroupParticle label="Pronom(s)" subtext="(Champ facultatif)">
            <input :type="InputTypes.TEXT" inputName="pronouns" placeholder="il / iel / ael"
                :class="useAuthFormAlertsStore().pronounsAlert.type === AlertTypes.SUCCESS ? 'ig-input __success' : 'ig-input'"
                v-model="signupFormData.pronouns" @change="validatePronouns(signupFormData.pronouns)" />
            <FormFieldAlertParticle :alert="useAuthFormAlertsStore().pronounsAlert" />
        </InputGroupParticle>
        <!-- Submit -->
        <div class="form-submit-container">
            <ButtonParticle :type="ButtonTypes.SUB" :style="ButtonStyles.CL" :size="ButtonSizes.BIG">Envoyer
            </ButtonParticle>
        </div>
    </form>
</template>

<style lang="scss">
@use '@/styles/theme.scss' as *;

.signup-form {
    box-sizing: border-box;
    margin: $space-xl 0;
    background-color: color($primary, 68);
    border-radius: $radius-s;
    padding: $space-s $space-m;
    width: 520px;

    @media (max-width: $bp-m) {
        width: 100%;
        padding: $space-s $space-m;
    }
}

.radio-input-line>label,
.radio-input-line>input {
    cursor: pointer;
}
</style>