<script setup lang="ts">
import { useLanguagesStore } from '@/stores/languages.store';
import UpdateUserFormComponent from '@/components/auth/UpdateUserFormComponent.vue';
import { Languages } from '@/enums/languages.enum';
import { useAuth } from '@/composables/auth.composable';
import type { User } from '@/interfaces/User.interface';
import DeleteUserFormComponent from '@/components/auth/DeleteUserFormComponent.vue';

const user: User | void = await useAuth().getAuthUser();

</script>

<template>
    <div class="accountview-contents">
        <div class="classic-container">
            <HeroTitleParticle v-if="useLanguagesStore().activeLanguage == Languages.FR" normalText="Mon"
                highlightedText="compte" textColor="light" highlightColor="admin" />
            <HeroTitleParticle v-else normalText="My" highlightedText="account" textColor="light" highlightColor="admin" />
            <div class="account-forms-container">
                <UpdateUserFormComponent :user="user" />
                <div class="account-forms-separator"></div>
                <DeleteUserFormComponent :userId="user?._id" />
            </div>
            <!-- todo: add detele account button and view -->
        </div>
    </div>
</template>

<style lang="scss">
@use '@/styles/theme.scss' as *;

.accountview-contents {
    margin-top: -$space-xxl;
    background-image: url('@/assets/images/shed.jpeg');
    padding: $space-l 0 $space-xxl;
    min-height: 500px;

    @media (max-width: $bp-m) {
        margin-top: -$space-m;
    }

    >.classic-container {
        margin-bottom: 0;

        @media (max-width: $bp-m) {
            margin-bottom: -$space-l;
        }
    }
}

.account-forms-container {
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.5);
    max-width: 600px;
    padding: $space-m;
    border-radius: $radius-xs;
    display: flex;
    flex-direction: column;

    .account-forms-separator {
        width: 40%;
        height: 2px;
        margin: $space-xl auto;
        background-color: color($secondary, 50);
        border-radius: $radius-circle;
        cursor: pointer;
        position: relative;

        &:hover {
            &::after {
                content: "";
                width: 10px;
                height: 10px;
                border-radius: $radius-circle;
                background-color: color($primary, 20);
                box-shadow: 0 2px 4px color($primary, 50) inset;
                position: absolute;
                left: 30%;
                top: -10px;
                animation: rollSeparator 1000ms ease-in-out alternate-reverse infinite;
            }
        }
    }
}

/* separator's animation */
@keyframes rollSeparator {
    0% {
        transform: translateX(0%);
    }

    15% {
        transform: translateX(0%);
    }

    85% {
        transform: translateX(800%) rotate(360deg);
    }

    100% {
        transform: translateX(800%) rotate(360deg);
    }
}
</style>
