import { Languages } from "@/enums/languages.enum";
import { Gender } from "@/enums/users/gender.enum";

export const getGenderString = (language: Languages, gender: Gender): string => {
    switch (language) {
        case Languages.EN:
            switch (gender) {
                case Gender.F: return 'Woman';
                case Gender.M: return 'Man';
                default: return 'Non-binary';
            }
        default:
            switch (gender) {
                case Gender.F: return 'Femme';
                case Gender.M: return 'Homme';
                default: return 'Non-binaire';
            }
    }
}