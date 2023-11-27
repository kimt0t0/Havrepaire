import type { FormTypes } from "@/enums/forms/form-types.enum";

export interface FormAlert {
    state: boolean,
    form: FormTypes
}