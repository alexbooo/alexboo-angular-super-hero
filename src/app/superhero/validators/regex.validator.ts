import { FormControl } from '@angular/forms';

export class RegexValidator {

    static isValid(control: FormControl) {
        if (control && control.value) {
            let valid = /[0-9\.-_+/*$#%]/.test(control.value.toLowerCase());
            if (valid) {
                console.log("valid regex");
                return null;

            }
            console.log("invalid regex");

            return {"invalid" : true}
        }
    }
}