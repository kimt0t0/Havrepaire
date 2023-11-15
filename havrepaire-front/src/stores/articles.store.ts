import { defineStore } from "pinia";
import { ref } from "vue";
import type { Article } from "@/interfaces/Article.interface";
import { useArticles } from "@/composables/articles.composable";

export const useArticlesStore = defineStore('articles', () => {

    const articles = ref<void | Article[]>();
    const recentArticles = ref<Article[]>();
    const popularArticles = ref<Article[]>();

    const setRecentArticles = (): void => {
        let newRecentArticles: Article[] = [];
        if (articles.value) {
            newRecentArticles = articles.value.sort(function (a, b) {
                var dateA = new Date(a.createdAt).getTime();
                var dateB = new Date(b.createdAt).getTime();

                return dateA - dateB
            })
        }
        recentArticles.value = newRecentArticles;
    };

    const setPopularArticles = (): void => {
        let newPopularArticles: Article[] = [];
        if (articles.value) {
            newPopularArticles = articles.value.sort(function (a, b) {
                return a.likes.length - b.likes.length
            })
        }
        popularArticles.value = newPopularArticles;
    };

    const getArticles = async (): Promise<void> => {
        articles.value = await useArticles().getArticles();
        setRecentArticles();
        setPopularArticles();
    }

    return {
        articles,
        getArticles,
        recentArticles,
        popularArticles,
    }
})