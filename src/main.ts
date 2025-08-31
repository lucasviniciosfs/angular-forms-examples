import { Component, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  FormControl,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  template: `
    <input type="text" [formControl]="input1"/>
    <form [formGroup]="fg">
      <input type="text" [formControl]="input1"/>
    </form>
  `,
})
export class App {
  name = 'Angular';
  fb: FormBuilder = inject(FormBuilder);
  fg!: FormGroup;
  fg2!: FormGroup;
  input1 = new FormControl('', this.isValid);

  ngOnInit() {
    this.fg = this.fb.group({
      name: ['', this.isValid],
    });
    this.fg2 = new FormGroup({
      name: new FormControl('', this.isValid),
    });
    this.input1.valueChanges
      .pipe(tap((v) => console.log(this.input1.errors)))
      .subscribe();
  }

  isValid(control: AbstractControl): ValidationErrors | null {
    if (control.value == 'valid') {
      return null;
    }
    return { isInvalid: true };
  }
}

bootstrapApplication(App);
