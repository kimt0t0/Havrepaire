<script setup lang="ts">
import { useLanguagesStore } from '@/stores/languages.store';
import { LinkStyles } from '@/enums/link-styles.enum';
import { LinkTypes } from '@/enums/link-types.enum';
import { Languages } from '@/enums/languages.enum';
</script>

<template>
    <footer>
        <!-- French contents -->
        <div class="classic-container footer-container" v-if="useLanguagesStore().activeLanguage === Languages.FR">
            <div class="footer-contents">
                <p class="footer-text">Conçu, écrit et codé par Kim Robert.</p>
                <p class="footer-text">Le code et les contenus (textuels et visuels) sont soumis au droit d'auteur français.
                </p>
            </div>
            <div class="footer-separator"></div>
            <div class="footer-ctas">
                <LinkParticle path="/contact" title="Me contacter" :style="LinkStyles.BUTTON" :type="LinkTypes.RL"
                    :admin="true" />
                <LinkParticle path="https://ko-fi.com/kimrobert" title="Faire un don" :style="LinkStyles.BUTTON"
                    :type="LinkTypes.CL" :admin="true" :blankTarget="true" />
            </div>
        </div>
        <!-- English contents -->
        <div class="classic-container footer-container" v-if="useLanguagesStore().activeLanguage === Languages.EN">
            <div class="footer-contents">
                <p class="footer-text">Designed, written and coded by Kim Robert.</p>
                <p class="footer-text">The code and contents (including visual and written contents) are protected by French
                    authors rights.</p>
            </div>
            <div class="footer-separator"></div>
            <div class="footer-ctas">
                <LinkParticle path="/contact" title="Contact Me" :style="LinkStyles.BUTTON" :type="LinkTypes.RL"
                    :admin="true" />
                <LinkParticle path="https://ko-fi.com/kimrobert" title="Donate" :style="LinkStyles.BUTTON"
                    :type="LinkTypes.RL" :admin="true" :blankTarget="true" />
            </div>
        </div>
    </footer>
</template>

<style lang="scss">
@use '@/styles/theme.scss' as *;

footer {
    font-size: $txt-xs;
    background-color: color($dark, 70);
    color: color($light, 50);
    box-shadow: 0 0 5px color($dark, 50);
    margin: 0;
    height: fit-content;
    padding: $space-m 0;
    margin-top: $space-xxl;

    @media (max-width: $bp-m) {
        margin-top: $space-m;
    }

}

.footer-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0 !important;
}

.footer-text {
    margin: $space-xxs 0;
    text-align: center;
}

.footer-ctas {
    width: 100%;
    display: flex;
    justify-content: center;

    .button-link {
        margin: 0 $space-s;
    }
}

.footer-separator {
    box-sizing: border-box;
    width: 50px;
    height: 50px;
    margin: $space-s 0;
    display: flex;
    justify-content: center;
    align-items: center;
    content: "";
    width: 20px;
    height: 20px;
    background-color: color($light, 50);
    border-radius: $radius-circle;
    cursor: pointer;
    transition: all 600ms ease-in-out;

    &:hover {
        transform: scale(1.4) rotate(360deg);

        &::after {
            content: "";
            width: 8px;
            height: 8px;
            background-color: color($secondary, 60);
            /* border-radius: $radius-xxs; */
        }
    }
}
</style>