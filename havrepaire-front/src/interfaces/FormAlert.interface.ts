import type { AlertTypes } from "@/enums/forms/alert-types.enum";
import type { FormTypes } from "@/enums/forms/form-types.enum";

export interface FormAlert {
    state: boolean,
    form: FormTypes,
    type?: AlertTypes,
    message?: String
}