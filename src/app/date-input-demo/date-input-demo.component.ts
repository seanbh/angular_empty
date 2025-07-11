import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DateInputDirective } from '../date-input.directive';

@Component({
  selector: 'app-date-input-demo',
  imports: [ReactiveFormsModule, FormsModule, DateInputDirective],
  templateUrl: './date-input-demo.component.html',
  styleUrl: './date-input-demo.component.scss'
})
export class DateInputDemoComponent {
  templateDrivenValue = '';
  templateDrivenStatus = '';
  
  reactiveForm = new FormGroup({
    dateField: new FormControl('')
  });
  
  reactiveStatus = '';
  
  onTemplateStatusChange(status: string) {
    this.templateDrivenStatus = status;
  }
  
  onReactiveStatusChange(status: string) {
    this.reactiveStatus = status;
  }
}
