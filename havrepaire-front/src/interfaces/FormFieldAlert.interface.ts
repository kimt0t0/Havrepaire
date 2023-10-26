import type { AlertTypes } from "@/enums/alert-types.enum"

export interface FormFieldAlert {
    state: boolean,
    type?: AlertTypes,
    message?: string
}