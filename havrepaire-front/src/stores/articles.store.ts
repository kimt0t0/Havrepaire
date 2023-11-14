import { defineStore } from "pinia";
import { computed, ref, type ComputedRef } from "vue";
import type { Article } from "@/interfaces/Article.interface";
import { useArticles } from "@/composables/articles.composable";

export const useArticlesStore = defineStore('articles', () => {

    const articles = ref<void | Article[]>();

    const getRecentArticles = (): Article[] => {
        let recentArticles: Article[] = [];
        if (articles.value) {
            recentArticles = articles.value.sort(function (a, b) {
                var dateA = new Date(a.createdAt).getTime();
                var dateB = new Date(b.createdAt).getTime();

                return dateA - dateB
            })
        }
        return recentArticles;
    };

    const getPopularArticles = (): Article[] => {
        let popularArticles: Article[] = [];
        if (articles.value) {
            popularArticles = articles.value.sort(function (a, b) {
                return a.likes.length - b.likes.length
            })
        }
        return popularArticles;
    };

    const getArticles = async (): Promise<void> => {
        articles.value = await useArticles().getArticles();
    }

    return {
        articles,
        getArticles,
        getRecentArticles,
        getPopularArticles,
    }
})