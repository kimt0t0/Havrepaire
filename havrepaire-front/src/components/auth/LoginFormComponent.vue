<script setup lang="ts">
import { ButtonTypes } from '@/enums/button-types.enum';
import { InputTypes } from '@/enums/input-types.enum';
</script>

<template>
    <form class="login-form">
        <InputGroupParticle label="Pseudonyme" inputName="username" :inputType="InputTypes.TEXT" placeholder="Psudonim" />
        <InputGroupParticle label="Mot-de-passe" inputName="password" :inputType="InputTypes.PASS" placeholder="password" />
        <div class="form-submit-container">
            <ButtonParticle :type="ButtonTypes." />
        </div>
    </form>
</template>

<style lang="scss">
@use '@/styles/theme.scss' as *;

.login-form {
    box-sizing: border-box;
    margin: $space-xl 0;
    background-color: color($primary, 65);
    border-radius: $radius-s;
    padding: $space-s $space-m;
    width: 400px;

    @media (max-width: $bp-m) {
        width: 100%;
    }
}
</style>