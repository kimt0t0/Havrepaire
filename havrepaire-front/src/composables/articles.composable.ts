import type { Article } from "@/interfaces/Article.interface";
import { getArticlesUtil } from '@/utils/articles.utils';
import { useIllustrations } from "./illustrations.composable";

export const useArticles = () => {

    const getArticles = async (): Promise<Article[] | void> => {
        try {
            const articles = await getArticlesUtil();
            // load illustrations
            for (let i = 0; i < articles.data.length && i < 30; i++) {
                if (articles.data[i].illustration) {
                    const newIllustration = await useIllustrations().getIllustrationById(articles.data[i].illustration._id);
                    articles.data[i].illustration = newIllustration;
                }
            }
            return articles.data;
        } catch (e) {
            console.error(`Oups, erreur lors de l'obtention des articles depuis l'API : ${e}`)
        }
    }

    return {
        getArticles
    }
}