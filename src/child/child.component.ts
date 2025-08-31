import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-child',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `
        <p>child works!</p>
        <ng-content select='[content2]'></ng-content>
    `,
    styleUrl: './child.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent { }
