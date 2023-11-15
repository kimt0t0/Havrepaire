import axiosInstance from "@/services/api"
import type { ObjectId } from "mongodb"

export const getIllustrationByIdUtil = (id: string | ObjectId): Promise<any> => {
    return axiosInstance.get(`/illustrations/${id.toString()}`);
}