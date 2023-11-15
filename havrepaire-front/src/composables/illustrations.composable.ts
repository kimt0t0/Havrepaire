import type { Illustration } from "@/interfaces/Illustration.interface"
import type { ObjectId } from "mongodb"
import { getIllustrationByIdUtil } from "@/utils/illustrations.utils";

export const useIllustrations = () => {

    const getIllustrationById = async (id: string | ObjectId | void | Illustration): Promise<Illustration | void> => {
        try {
            if (id) {
                if (typeof id !== 'string') id = id.toString();
                const illustration = await getIllustrationByIdUtil(id);
                return illustration.data;
            }
            else throw new Error(`Oups, erreur lors de l'obtention de l'image à identifiant ${id}. Le format de l'identifiant ne semble pas convenir.`);
        } catch (e) {
            console.error(`Oups, erreur lors de l'obtention de l'image à identifiant ${id} : ${e}`);
        }
    }

    return {
        getIllustrationById
    }
}