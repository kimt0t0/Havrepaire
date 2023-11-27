import type { AlertTypes } from "@/enums/forms/alert-types.enum"

export interface FormFieldAlert {
    state: boolean,
    type?: AlertTypes,
    message?: string
}