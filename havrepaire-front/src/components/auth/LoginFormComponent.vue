<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuth } from '@/composables/auth.composable';
import { useAuthFormAlertsStore } from "@/stores/auth-form-alerts.store";
import { validateUsername, validatePassword } from '@/validators/auth-validators.validators';
import type { Credentials } from '@/interfaces/Credentials.interface';
import { AlertTypes } from '@/enums/alert-types.enum';
import { ButtonSizes } from '@/enums/button-sizes.enum';
import { ButtonStyles } from '@/enums/button-styles.enum';
import { ButtonTypes } from '@/enums/button-types.enum';
import { InputTypes } from '@/enums/input-types.enum';
import { LinkStyles } from '@/enums/link-styles.enum';
import { LinkTypes } from '@/enums/link-types.enum';

const { loginUser } = useAuth();

const showPassword = ref<boolean>(false);
const toggleShowPassword = (): void => {
    showPassword.value = !showPassword.value;
}

const loginFormData = reactive<Credentials>({ username: '', password: '' });
</script>

<template>
    <form class="login-form" @submit="loginUser($event, loginFormData)">
        <!-- Username -->
        <InputGroupParticle label="Pseudonyme" inputName="username" :binding="loginFormData.username">
            <input :type="InputTypes.TEXT" id="username" name="username" placeholder="Psudonim"
                :class="useAuthFormAlertsStore().usernameAlert.type === AlertTypes.SUCCESS ? 'ig-input __success' : 'ig-input'"
                v-model="loginFormData.username" @change="validateUsername(loginFormData.username)" required />
            <FormFieldAlertParticle :alert="useAuthFormAlertsStore().usernameAlert" />
        </InputGroupParticle>
        <!-- Password -->
        <InputGroupParticle label="Mot-de-passe" inputName="password">
            <div
                :class="useAuthFormAlertsStore().passwordAlert.type === AlertTypes.SUCCESS ? 'ig-input __password __success' : 'ig-input __password'">
                <input :type="showPassword ? InputTypes.TEXT : InputTypes.PASS" id="password" name="password"
                    placeholder="MotDePasse" class="input-password" v-model="loginFormData.password"
                    @change="validatePassword(loginFormData.password)" required />
                <button type="button" class="password-button" @click="toggleShowPassword">{{ showPassword ? 'X' : 'O'
                }}</button>
            </div>
            <FormFieldAlertParticle :alert="useAuthFormAlertsStore().passwordAlert" />
        </InputGroupParticle>
        <!-- Submit -->
        <div class="form-submit-container">
            <ButtonParticle :type="ButtonTypes.SUB" :style="ButtonStyles.CL" :size="ButtonSizes.BIG">Envoyer
            </ButtonParticle>
        </div>
        <!-- Forgotten credentials -->
        <aside class="form-ctas">
            <LinkParticle path="/contact" title="Identifiants oubliés ?" :style="LinkStyles.LINK" :type="LinkTypes.RL"
                :admin="false" :blankTarget="true" />
        </aside>
    </form>
</template>

<style lang="scss">
@use '@/styles/theme.scss' as *;

.login-form {
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
</style>@/enums/forms/input-types.enum@/enums/forms/alert-types.enum