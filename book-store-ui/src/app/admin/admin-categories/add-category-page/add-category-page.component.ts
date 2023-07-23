import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormItem } from 'src/app/shared/components/form/form.component';

import { CategoryService } from '../categories.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryItemData } from '../shared/category';

@Component({
  selector: 'app-add-category-page',
  templateUrl: './add-category-page.component.html',
  styleUrls: ['./add-category-page.component.scss']
})
export class AddCategoryPageComponent {
  addCategoryForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  fields: FormItem[] = [
    {
      name: 'name',
      title: 'Title',
      type: 'text'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'textarea'
    }
  ];

  constructor(private service: CategoryService, private toastrService: ToastrService) { }

  handleSubmit(values: any) {
    this.service.createCategory(values).subscribe({
      next: (data: CategoryItemData) => {
        this.toastrService.success('Created a new category successfully');
      },
      error: error => {
        this.toastrService.error(error.error.error);
      }
    });
  }
}
