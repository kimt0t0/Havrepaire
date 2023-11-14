import type { Article } from "@/interfaces/Article.interface";
import { getArticlesUtil } from '@/utils/articles.utils';

export const useArticles = () => {

    const getArticles = async (): Promise<Article[] | void> => {
        try {
            const articles = await getArticlesUtil();
            return articles.data;
        } catch (e) {
            console.error(`Oups, erreur lors de l'obtention des articles depuis l'API : ${e}`)
        }
    }

    return {
        getArticles
    }
}