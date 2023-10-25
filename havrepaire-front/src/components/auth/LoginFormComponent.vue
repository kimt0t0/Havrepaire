<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuth } from '@/composables/auth.composable';
import { useAuthFormAlertsStore } from "@/stores/auth-form-alerts.store";
import { ButtonSizes } from '@/enums/button-sizes.enum';
import { ButtonStyles } from '@/enums/button-styles.enum';
import { ButtonTypes } from '@/enums/button-types.enum';
import { InputTypes } from '@/enums/input-types.enum';
import { LinkStyles } from '@/enums/link-styles.enum';
import { LinkTypes } from '@/enums/link-types.enum';
import type { Credentials } from '@/interfaces/Credentials.interface';

const { loginUser } = useAuth();

const showPassword = ref<boolean>(false);
const toggleShowPassword = (): void => {
    showPassword.value = !showPassword.value;
}

const loginFormData = reactive<Credentials>({ username: '', password: '' });
</script>

<template>
    <form class="login-form" @submit="loginUser($event, loginFormData)">
        <InputGroupParticle label="Pseudonyme" inputName="username" :binding="loginFormData.username">
            <input :type="InputTypes.TEXT" id="username" name="username" placeholder="Psudonim" class="ig-input"
                v-model="loginFormData.username" required />
        </InputGroupParticle>
        <InputGroupParticle label="Mot-de-passe" inputName="password">
            <div class="ig-input __password">
                <input :type="showPassword ? InputTypes.TEXT : InputTypes.PASS" id="password" name="password"
                    placeholder="MotDePasse" class="ig-input" v-model="loginFormData.password" required />
                <button type="button" class="password-button" @click="toggleShowPassword">{{ showPassword ? 'X' : 'O'
                }}</button>
            </div>
        </InputGroupParticle>
        <div class="form-submit-container">
            <ButtonParticle :type="ButtonTypes.SUB" :style="ButtonStyles.CL" :size="ButtonSizes.BIG">Envoyer
            </ButtonParticle>
        </div>
        <aside class="form-ctas">
            <LinkParticle path="/contact" title="Identifiants oubliés ?" :style="LinkStyles.LINK" :type="LinkTypes.RL"
                :admin="false" :blankTarget="true" />
        </aside>
        <aside class="form-result">
            <p class="form-alert-text" v-if="useAuthFormAlertsStore().loginSuccess">Connexion réussie !</p>
            <p class="form-alert-text" v-if="useAuthFormAlertsStore().loginFailure">Oups, connexion ratée...</p>
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
    padding: $space-s $space-xxxl $space-s $space-m;
    width: fit-content;

    @media (max-width: $bp-m) {
        width: 100%;
        padding: $space-s $space-m;
    }
}
</style>