import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { CategoryService } from '../categories.service';
import { ToastrService } from 'ngx-toastr';

import { CategoryItemData } from '../shared/category';
import { FormItem } from 'src/app/shared/components/form/form.component';

import { switchMap, catchError } from 'rxjs';

@Component({
  selector: 'app-update-category-page',
  templateUrl: './update-category-page.component.html',
  styleUrls: ['./update-category-page.component.scss']
})
export class UpdateCategoryPageComponent implements OnInit {
  categoryId: string = '';
  updateCategoryForm: FormGroup = new FormGroup({
    description: new FormControl('', [Validators.required])
  });

  fields: FormItem[] = [
    {
      name: 'description',
      title: 'Description',
      type: 'textarea'
    }
  ];

  constructor(private service: CategoryService, private toastrService: ToastrService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(({ id }) => this.service.getCategoryById(id)),
      catchError(error => {
        throw error;
      })
    ).subscribe({
      next: ({ data }) => {
        this.categoryId = data.id;
        this.updateCategoryForm.patchValue({ ...data })
      },
      error: error => {
        this.router.navigate(['*']);
      }
    });
  }

  handleSubmit(values: any) {
    this.service.updateCategory(this.categoryId, values).subscribe({
      next: (data: CategoryItemData) => {
        this.toastrService.success('Updated a new category successfully');
        this.router.navigate(['/admin/categories'])
      },
      error: error => {
        this.toastrService.error(error.error.error);
      }
    });
  }
}
