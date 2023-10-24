<script setup lang="ts">
import { ButtonSizes } from '@/enums/button-sizes.enum';
import { ButtonStyles } from '@/enums/button-styles.enum';
import { ButtonTypes } from '@/enums/button-types.enum';
import { InputTypes } from '@/enums/input-types.enum';
import { LinkStyles } from '@/enums/link-styles.enum';
import { LinkTypes } from '@/enums/link-types.enum';
</script>

<template>
    <form class="login-form">
        <InputGroupParticle label="Pseudonyme" inputName="username" :inputType="InputTypes.TEXT" placeholder="Psudonim" />
        <InputGroupParticle label="Mot-de-passe" inputName="password" :inputType="InputTypes.PASS"
            placeholder="Mot-de-passe" />
        <div class="form-submit-container">
            <ButtonParticle :type="ButtonTypes.SUB" :style="ButtonStyles.CL" :size="ButtonSizes.BIG">Envoyer
            </ButtonParticle>
        </div>
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
    width: fit-content;

    @media (max-width: $bp-m) {
        width: 100%;
    }
}
</style>