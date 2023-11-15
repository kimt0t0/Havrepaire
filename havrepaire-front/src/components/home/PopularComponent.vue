<script setup lang="ts">
import { useArticlesStore } from '@/stores/articles.store';


const getSize = (index: number) => {
    if (index >= 1) {
        return 'small'
    }
    return 'large'
};

const getColor = (index: number) => {
    if (index >= 1) {
        return 'primary'
    }
    return 'success'
};
</script>

<template>
    <div class="popular-container">
        <div class="classic-container contents-container">
            <!-- Title -->
            <HeroTitleParticle normalText="Textes populaires" textColor="success" />
            <div class="cards-container">
                <CardParticle v-for="(article, index) of useArticlesStore().popularArticles" :key="index"
                    :title="article.titleFr" :subtext="article.textFr" :size="getSize(index)" :color="getColor(index)"
                    :articleId="article._id" />
            </div>
        </div>
        <div class="popular-bottom"></div>
    </div>
</template>

<style lang="scss">
@use '@/styles/theme.scss' as *;

.popular-container {
    background-color: color($primary, 15);
    padding: $space-l 0 $space-xl;
    position: relative;

    /* animated bubble */
    &:hover {
        &::after {
            content: "";
            width: 50px;
            height: 50px;
            border-radius: $radius-circle;
            position: absolute;
            top: -$space-m;
            right: 40%;
            animation: riseBubble 1800ms linear 1;
        }
    }

    .contents-container {
        padding: 0 $space-m;
    }
}

.cards-container {
    width: 810px;
    max-width: 810px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    @media (max-width: 840px) {
        width: 100%;
        max-width: 100%;
    }
}

.popular-bottom {
    box-sizing: border-box;
    width: 110%;
    height: 60px;
    border-radius: 0 0 50% 50%;
    background-color: color($primary, 15);
    margin-left: -5%;
    margin-bottom: -$space-xxl;
}

/* bubble's animation */
@keyframes riseBubble {
    5% {
        background-color: color($primary, 45);
    }

    15% {
        top: -$space-l;
        right: 35%;
    }

    30% {
        top: -$space-xl;
        right: 37%;
    }

    50% {
        top: -space-xxl;
        right: 32%;
        width: 42px;
        height: 42px;
        background-color: color($primary, 54);
    }

    70% {
        top: -$space-xxxl;
        right: 28%;
        width: 34px;
        height: 34px;
        background-color: color($primary, 62);
    }

    80% {
        top: -204px;
        right: 25%;
        width: 36px;
        height: 36px;
        background-color: color($primary, 66);
    }

    90% {
        top: -316px;
        right: 21%;
        width: 24px;
        height: 24px;
        background-color: color($primary, 68);
    }

    100% {
        top: -380px;
        right: 18%;
        width: 18px;
        height: 18px;
        background-color: transparent;
    }

}
</style>