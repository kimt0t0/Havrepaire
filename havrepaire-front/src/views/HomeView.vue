<script setup lang="ts">
import { ButtonSizes } from '@/enums/button-sizes.enum';
import { ButtonStates } from '@/enums/button-states.enum';
import { ButtonStyles } from '@/enums/button-styles.enum';
import { ButtonTypes } from '@/enums/button-types.enum';
import { FlexPositions } from '@/enums/flex-positions.enum';
import { LinkStyles } from '@/enums/link-styles.enum';
import { LinkTypes } from '@/enums/link-types.enum';

</script>

<template>
    <main>
        <h1>Accueil</h1>
        <h2>Test des particules</h2>
        <h3>Liens classiques</h3>
        <LinkParticle path="/a-propos" title="A propos" :style="LinkStyles.LINK" :type="LinkTypes.RL" :admin="false" />
        <LinkParticle path="/nouveau-contenu" title="Nouveau contenu" :style="LinkStyles.LINK" :type="LinkTypes.RL"
            :admin="true" />
        <h3>Liens boutons</h3>
        <LinkParticle path="/a-propos" title="A propos" :style="LinkStyles.BUTTON" :type="LinkTypes.RL" :admin="false" />
        <LinkParticle path="/nouveau-contenu" title="Nouveau contenu" :style="LinkStyles.BUTTON" :type="LinkTypes.RL"
            :admin="true" />
        <h3>Boutons classiques</h3>
        <ButtonParticle :type="ButtonTypes.BUT" :position="FlexPositions.CE" :size="ButtonSizes.SMA">Bouton classique
        </ButtonParticle>
        <ButtonParticle :type="ButtonTypes.BUT" :position="FlexPositions.CE" :size="ButtonSizes.MED"
            :style="ButtonStyles.AD">Bouton admin</ButtonParticle>
        <ButtonParticle :state="ButtonStates.DA" :size="ButtonSizes.BIG">Gros bouton désactivé</ButtonParticle>
        <ButtonParticle :state="ButtonStates.DA" :style="ButtonStyles.AD" :size="ButtonSizes.BIG">G.B.D. admin
        </ButtonParticle>
    </main>
</template>
