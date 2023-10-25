<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuth } from '@/composables/auth.composable';
import { useAuthFormAlertsStore } from "@/stores/auth-form-alerts.store";
import type { NewUser } from '@/interfaces/NewUser.interface';
import { ButtonSizes } from '@/enums/button-sizes.enum';
import { ButtonStyles } from '@/enums/button-styles.enum';
import { ButtonTypes } from '@/enums/button-types.enum';
import { InputTypes } from '@/enums/input-types.enum';

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
    pronouns: undefined
});

</script>

<template>
    <form class="signup-form" @submit="signupUser($event, signupFormData)">
        <!-- username -->
        <InputGroupParticle label="Pseudonyme" inputName="username">
            <input :type="InputTypes.TEXT" name="username" id="username" placeholder="Psudonim"
                v-model="signupFormData.username" class="ig-input" required />
        </InputGroupParticle>
        <!-- password -->
        <InputGroupParticle label="Mot-de-passe" inputName="password">
            <div class="ig-input __password">
                <input :type="showPassword ? InputTypes.TEXT : InputTypes.PASS" name="password" id="password"
                    placeholder="MotDePasse" v-model="signupFormData.password" class="input-password" required />
                <button type="button" class="password-button" @click="toggleShowPassword">{{ showPassword ? 'X' : 'O'
                }}</button>
            </div>
        </InputGroupParticle>
        <!-- email -->
        <InputGroupParticle label="Adresse mail" inputName="email">
            <input :type="InputTypes.EMAIL" name="email" id="email" placeholder="psudonim@mailtruc.com"
                v-model="signupFormData.email" class="ig-input" required />
        </InputGroupParticle>
        <!-- gender -->
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
        <!-- pronouns -->
        <InputGroupParticle label="Pronom(s)" subtext="(Champ facultatif)" inputName="pronouns" :inputType="InputTypes.TEXT"
            placeholder="il / iel / ael" />
        <!-- submit button -->
        <div class="form-submit-container">
            <ButtonParticle :type="ButtonTypes.SUB" :style="ButtonStyles.CL" :size="ButtonSizes.BIG">Envoyer
            </ButtonParticle>
        </div>
        <!-- end alerts -->
        <aside class="form-result">
            <p class="form-alert-text" v-if="useAuthFormAlertsStore().signupSuccess">Inscription et connexion réussies !</p>
            <p class="form-alert-text" v-if="useAuthFormAlertsStore().signupFailure">Oups, inscription ou connexion ratée...
            </p>
        </aside>
    </form>
</template>

<style lang="scss">
@use '@/styles/theme.scss' as *;

.signup-form {
    box-sizing: border-box;
    margin: $space-xl 0;
    background-color: color($primary, 68);
    border-radius: $radius-s;
    padding: $space-s $space-xxxl $space-s $space-m;
    width: fit-content;

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