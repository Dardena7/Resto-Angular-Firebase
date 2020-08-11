import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
    selector: '[minPrice]',
    providers: [{provide: NG_VALIDATORS, useExisting: PriceValidator, multi: true}]
})
export class PriceValidator implements Validator {
    @Input() minPrice: number;

    validate(control: AbstractControl): {[key:string]: any} | null {
        return control.value < this.minPrice ? { minPrice:{invalid: true, actual: control.value}} : null; 
    }
}