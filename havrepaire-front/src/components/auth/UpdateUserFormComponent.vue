<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { ObjectId } from 'mongodb';
import { getGenderString } from '@/utils/get-strings.utils';
import { validateUsername, validatePassword, validateNewPassword, validateEmail, validatePronouns } from '@/validators/auth-validators.validators';
import { useLanguagesStore } from '@/stores/languages.store';
import { Languages } from '@/enums/languages.enum';
import { ButtonStyles } from '@/enums/button-styles.enum';
import { ButtonSizes } from '@/enums/button-sizes.enum';
import { ButtonStates } from '@/enums/button-states.enum';
import { Gender } from '@/enums/users/gender.enum';
import { ButtonTypes } from '@/enums/button-types.enum';
import type { User } from '@/interfaces/User.interface';
import { useUsers } from '@/composables/users.composable';

defineProps<{
    user: User | void
}>();

// Handle form constants
const editUsername = ref<boolean>(false);
const addNewPassword = ref<boolean>(false);
const addNewEmail = ref<boolean>(false);
const editGender = ref<boolean>(false);
const editPronouns = ref<boolean>(false);

// Form data
const updateUserFormData = reactive<any>({});

// Handle form toggler
const toggleEditUsername = (): void => {
    editUsername.value = !editUsername.value;
    if (editUsername.value === false) delete updateUserFormData.username;
};

const toggleAddNewPassword = (): void => {
    addNewPassword.value = !addNewPassword.value;
    if (addNewPassword.value === false) delete updateUserFormData.newPassword;
};

const toggleAddNewEmail = (): void => {
    addNewEmail.value = !addNewEmail.value;
    if (addNewEmail.value === false) delete updateUserFormData.email;
};

const toggleEditGender = (): void => {
    editGender.value = !editGender.value;
    if (editGender.value === false) delete updateUserFormData.gender;
};

const toggleEditPronouns = (): void => {
    editPronouns.value = !editPronouns.value;
    if (editPronouns.value === false) delete updateUserFormData.pronouns;
};


// Update user function
const updateUser = (e: Event, userId: ObjectId | string | void): void => {
    e.preventDefault();
    const updatedUser = useUsers().updateUser(userId, updateUserFormData)
    console.log(JSON.stringify(updatedUser));
    // (todo: activate alert if password is wrong and API refused update / if wrong data).
}
</script>

<template>
    <!-- FORM -->
    <form v-if="user" class="account-form" @submit="updateUser($event, user._id)">
        <h3 class="account-form-title">Mes informations</h3>
        <!-- Username -->
        <InputGroupParticle label="Pseudonyme:" inputName="username">
            <div class="input-line">
                <input class="ig-input edit-user-input" type="text" id="username" name="username"
                    v-model="updateUserFormData.username" :placeholder="user?.username"
                    :disabled="editUsername ? false : true" @change="validateUsername(updateUserFormData.username)" />
                <ButtonParticle :type="ButtonTypes.BUT" :style="ButtonStyles.CL" @click="toggleEditUsername">{{ editUsername
                    ? 'X' : 'O'
                }}</ButtonParticle>
            </div>
        </InputGroupParticle>
        <!-- Gender -->
        <InputGroupParticle label="Genre:" inputName="gender">
            <div class="input-line" v-if="!editGender">
                <p class="account-form-text"><strong>Actuel:</strong> {{ getGenderString(useLanguagesStore().activeLanguage,
                    user.gender) }}</p>
                <ButtonParticle :type="ButtonTypes.BUT" :style="ButtonStyles.CL" @click="toggleEditGender">{{ editGender
                    ? 'X' : 'O'
                }}</ButtonParticle>
            </div>
            <!-- (gender select menu) -->
            <div class="input-line" v-else>
                <select v-if="editGender" class="__select-menu ig-input edit-user-input" id="gender" name="gender"
                    v-model="updateUserFormData.gender">
                    <option :value="undefined">Veuillez choisir une option</option>
                    <option :value="Gender.N">{{ useLanguagesStore().activeLanguage === Languages.FR ? 'Non-binaire' :
                        'Non-binary' }}</option>
                    <option :value="Gender.F">{{ useLanguagesStore().activeLanguage === Languages.FR ? 'Femme' :
                        'Woman' }}</option>
                    <option :value="Gender.M">{{ useLanguagesStore().activeLanguage === Languages.FR ? 'Homme' :
                        'Man' }}</option>
                </select>
                <ButtonParticle :type="ButtonTypes.BUT" :style="ButtonStyles.CL" @click="toggleEditGender">{{ editGender
                    ? 'X' : 'O'
                }}</ButtonParticle>
            </div>
        </InputGroupParticle>
        <!-- Pronouns -->
        <InputGroupParticle label="Pronoms:" inputName="pronouns">
            <div class="input-line">
                <input class="ig-input edit-user-input" type="text" id="pronouns" name="pronouns"
                    v-model="updateUserFormData.pronouns"
                    :placeholder="user.pronouns ? user.pronouns : 'Mes pronoms de genre'"
                    :disabled="editPronouns ? false : true" @change="validatePronouns(updateUserFormData.pronouns)" />
                <ButtonParticle :type="ButtonTypes.BUT" :style="ButtonStyles.CL" @click="toggleEditPronouns">{{ editPronouns
                    ? 'X' : 'O'
                }}</ButtonParticle>
            </div>
        </InputGroupParticle>
        <!-- Email -->
        <div class="edit-user-data-group">
            <ButtonParticle :style="ButtonStyles.CL" :size="ButtonSizes.MED" @click="toggleAddNewEmail">
                {{ addNewEmail ?
                    '- Pas de nouvelle adresse mail'
                    :
                    '+ Nouvelle adresse mail'
                }}
            </ButtonParticle>
            <InputGroupParticle v-if="addNewEmail" inputName="email">
                <input class="ig-input edit-user-input" type="email" id="email" name="email"
                    v-model="updateUserFormData.email" @change="validateEmail(updateUserFormData.email)" />
            </InputGroupParticle>
        </div>
        <!-- New password -->
        <div class="edit-user-data-group">
            <ButtonParticle :style="ButtonStyles.CL" :size="ButtonSizes.MED" @click="toggleAddNewPassword">
                {{ addNewPassword ?
                    '- Pas de nouveau mot de passe'
                    :
                    '+ Nouveau mot de passe'
                }}
            </ButtonParticle>
            <InputGroupParticle v-if="addNewPassword" inputName="newPassword">
                <input class="ig-input edit-user-input" type="password" id="newPassword" name="newPassword"
                    v-model="updateUserFormData.username" @change="validateNewPassword(updateUserFormData.newPassword)" />
            </InputGroupParticle>
        </div>
        <!-- Password - mandatory -->
        <InputGroupParticle label="Mot de passe actuel (obligatoire):" inputName="password">
            <input class="ig-input edit-user-input" type="password" id="password" name="password"
                v-model="updateUserFormData.password" @change="validatePassword(updateUserFormData.password)" />
        </InputGroupParticle>
        <!-- Submit button -->
        <div class="update-user-submit-container">
            <ButtonParticle :style="ButtonStyles.AD" :size="ButtonSizes.BIG"
                :state="updateUserFormData.password ? ButtonStates.CL : ButtonStates.DA">
                Envoyer
            </ButtonParticle>
        </div>
    </form>
    <!-- ERROR MESSAGE -->
    <p class="error loading" v-else>
        {{ useLanguagesStore().activeLanguage === Languages.FR ?
            'Oups, une erreur s\'est produite dans le chargement de vos données ! Veuillez contacter le support.'
            :
            'Ooops ! There was an issue while loading your data ! Please contact our support.'
        }}
    </p>
</template>

<style lang="scss">
@use '@/styles/theme.scss' as *;

.account-form {
    display: flex;
    flex-direction: column;

    .account-form-title {
        font-size: $txt-l;
        color: color($secondary, 45);
        margin: 0;
        padding: 0 $space-m $space-xs 0;
        border-bottom: 2px solid color($secondary, 45);
        width: fit-content;
    }

    .account-form-text {
        color: color($primary, 25);
        margin: 0;
    }

    .__select-menu {
        @include button();
        border-radius: $radius-xs;
        width: 320px;
        cursor: pointer;
        @include transition();

        @media (max-width: 360px) {
            width: 100%;
        }

        &:hover {
            background-color: color($primary, 25);
            color: color($light, 50);
        }
    }

    .input-line {
        display: flex;
        align-items: center;

        >button {
            border-radius: $radius-xs;
            margin-left: $space-s;
        }
    }

    .edit-user-data-group {
        margin: $space-m 0;

        >button {
            width: 220px;

            @media (max-width: $bp-xxs) {
                width: auto;
            }

        }
    }

    .edit-user-input {
        border: 2px solid color($primary, 25);
    }

}

.update-user-submit-container {
    padding-top: $space-s;
    display: flex;
    justify-content: center;
}
</style>