<script setup lang="ts">
import { useArticlesStore } from '@/stores/articles.store';
</script>

<template>
    <div class="articles-list-container">
        <div class="classic-container contents-container">
            <HeroTitleParticle normalText="Explorez la " highlightedText="liste des articles" />
            <ol class="articles-list">
                <li class="__item" v-for="(article, index) of useArticlesStore().articles" :key="index">
                    <CardParticle :articleId="article._id" :illustration="article.illustration && article.illustration"
                        color="primary" :title="article.titleFr"
                        :subtext="article.textFr && article.textFr.substring(0, 50)" size="smallFixed" />
                </li>
            </ol>
        </div>
    </div>
</template>

<style lang="scss">
@use '@/styles/theme.scss' as *;

.articles-list-container {
    padding: $space-xxl 0 0;
    background-color: color($success, 50);
    border-bottom: $space-xl solid color($success, 20);

    .contents-container {
        padding: 0 $space-m;
    }
}

.articles-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: $space-m 0;

    .__item {
        width: fit-content;
        list-style-type: none;

        @media (max-width: 550px) {
            width: 100%;
        }
    }
}
</style>