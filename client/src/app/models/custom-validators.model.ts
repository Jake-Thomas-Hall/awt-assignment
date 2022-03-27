import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
    static fieldsMatch(first: string, second: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const firstFieldValue = control.get(first)?.value;
            const secondFieldValue = control.get(second)?.value;

            if (firstFieldValue && secondFieldValue) {
                if (firstFieldValue !== secondFieldValue) {
                    return { fieldsDoNotMatch: true };
                }

                return null;
            }
            else {
                return null;
            }
        }
    }
}