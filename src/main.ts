import { Component, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  FormControl,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { tap } from 'rxjs';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, NgTemplateOutlet],
  template: `
    <input type="text" [formControl]="input1"/>
    <form [formGroup]="fg">
      <input type="text" [formControl]="input1"/>
    </form>
    <ng-container *ngTemplateOutlet="test"></ng-container><br>
    <ng-container *ngTemplateOutlet="test2, context: mycontext"></ng-container><br>
    <ng-container *ngTemplateOutlet="test3, context: mycontext"></ng-container>

    <ng-template #test >
      <span>TEMPLATE OUTLET</span>
    </ng-template><br/>
    <ng-template #test2 let-test2>
      <span>{{test2}}</span>
    </ng-template>
    <ng-template #test3 let-user="isUser">
      <span>{{user}}</span>
    </ng-template>
  `,
})
export class App {
  name = 'Angular';
  fb: FormBuilder = inject(FormBuilder);
  fg!: FormGroup;
  fg2!: FormGroup;
  input1 = new FormControl('', this.isValid);
  mycontext = {$implicit: 'World', isUser: 'Svet'};

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
