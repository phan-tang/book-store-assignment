import { Component, Input, OnChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

export interface ErrorMessages {
  [key: string]: string;
}

@Component({
  selector: 'app-form-error-message',
  templateUrl: './form-error-message.component.html',
  styleUrls: ['./form-error-message.component.scss']
})
export class FormErrorMessageComponent implements OnChanges {
  @Input() errors!: ValidationErrors | null;
  @Input() fieldTitle!: string;
  @Input() errorMessages!: ErrorMessages | undefined;
  displayErrors: string[] | null = [];

  defaultErrorMessage: ErrorMessages = {
    required: " is required",
    requiredtrue: ' is required',
    pattern: " is invalid",
    minlength: " must be at least replaceValue characters long",
    maxlength: " must be up to replaceValue characters long",
    max: ' must be less than replaceValue',
    min: ' must be greater than replaceValue',
    email: ' is not a valid email format'
  };

  ngOnChanges(): void {
    this.displayErrors = [];
    this.errors && Object.keys(this.errors).forEach(error => {
      this.displayErrors?.push(this.getErrorMessage(error));
    });
  }

  getDefaultErrorMessage(error: string): string {
    const lengthError = ['minlength', 'maxlength'];
    const valueError = ['min', 'max'];
    let message = this.fieldTitle + this.defaultErrorMessage[error];
    if (lengthError.includes(error) && this.errors) {
      return message.replace('replaceValue', this.errors[error].requiredLength);
    }
    if (valueError.includes(error) && this.errors) {
      return message.replace('replaceValue', this.errors[error][error]);
    }
    return message;
  }

  getErrorMessage(error: string): string {
    return this.errorMessages && Object.keys(this.errorMessages).includes(error)
      ? this.errorMessages[error]
      : this.getDefaultErrorMessage(error);
  }
}
