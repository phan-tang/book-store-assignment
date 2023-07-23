import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorMessages } from '../form-error-message/form-error-message.component';

export interface FormItemOption {
  value: string | boolean;
  title: string;
}

export interface FormItem {
  name: string;
  title: string;
  type: string;
  errorMessages?: ErrorMessages;
  suffix?: string;
  prefix?: string;
  options?: FormItemOption[];
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
  @Output() handleSubmit = new EventEmitter<Object>();
  reader = new FileReader();
  hidePassword: boolean = true;

  constructor() { }

  handleSubmitForm() {
    this.handleSubmit.emit(this.formGroup.value);
  }

  handleUploadFile(event: any) {
    if (event.target.files) {
      let imageFile = event.target.files[0];
      this.reader.readAsDataURL(imageFile);
      this.formGroup.patchValue({
        imageFile: imageFile,
        image: [Date.now().toString(), imageFile.name].join('_')
      });
    }
  }
}
