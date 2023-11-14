import axiosInstance from "@/services/api";

export const getArticlesUtil = (): Promise<any> => {
    return axiosInstance.get('/articles');
}