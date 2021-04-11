import { FormArray, FormGroup, ValidatorFn } from '@angular/forms';

export function powerMaxValidator(min = 1, max = 2): ValidatorFn {
    return function validate (formArray: FormArray) {
        const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);

        // if the total is not greater than the minimum, return the error message
        return totalSelected >= min && totalSelected <= max ? null : { required: true };
    };
}