import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorMessages } from '../form-error-message/form-error-message.component';

export interface FormItem {
  name: string;
  title: string;
  type: string;
  errorMessages?: ErrorMessages;
  suffix?: string;
  prefix?: string;
  options?: {
    value: string;
    title: string;
  }[];
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() formGroup!: FormGroup;
  @Input() fieldsDisplay!: FormItem[];
  @Input() buttonText!: string;
  @Input() handleSubmit!: (value: Object) => void;

  hidePassword: boolean = true;

  constructor() { }

  handleSubmitForm() {
    this.handleSubmit && this.handleSubmit(this.formGroup.value);
  }
}
