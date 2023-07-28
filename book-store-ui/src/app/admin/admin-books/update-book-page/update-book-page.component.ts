import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/books/books.service';

import { FormItem } from 'src/app/shared/components/form/form.component';
import { BookItemData } from 'src/app/books/shared/book';

import { switchMap, catchError, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { getCategoriesList } from 'src/app/store/selectors/categories.selector';

@Component({
  selector: 'app-update-book-page',
  templateUrl: './update-book-page.component.html',
  styleUrls: ['./update-book-page.component.scss']
})
export class UpdateBookPageComponent implements OnInit {
  bookId: string = '';
  updateBookForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    author_name: new FormControl('', [Validators.required]),
    category_name: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required, Validators.min(0)]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    final_price: new FormControl('', [Validators.required, Validators.min(1)]),
    summary: new FormControl('', [Validators.required]),
    image: new FormControl(''),
    imageFile: new FormControl(null)
  });
  fields: FormItem[] = [
    {
      name: 'name',
      title: 'Title',
      type: 'text'
    },
    {
      name: 'author_name',
      title: 'Author',
      type: 'text'
    },
    {
      name: 'category_name',
      title: 'Category',
      type: 'select',
      options: []
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'textarea'
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      prefix: '$'
    },
    {
      name: 'final_price',
      title: 'Final Price',
      type: 'number',
      prefix: '$'
    },
    {
      name: 'quantity',
      title: 'Quantity',
      type: 'number'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'file-upload'
    }
  ];
  constructor(private bookService: BookService, private toastrService: ToastrService, private store: Store, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(({ id }) => this.bookService.getBookById(id)),
      catchError(error => {
        throw error;
      })
    ).subscribe({
      next: ({ data }) => {
        this.bookId = data.id;
        this.updateBookForm.patchValue({ ...data })
      },
      error: error => {
        this.router.navigate(['*']);
      }
    });
    this.store.select(getCategoriesList).pipe(map(({ categories }) => categories.map(item => ({ value: item.name, title: item.name })))).subscribe((data: any) => {
      this.fields.filter(item => item.name === 'category_name')[0].options = data;
    });
  }

  handleSubmit(values: any) {
    let formData = this.bookService.transformToFormData(values);
    this.bookService.updateBook(this.bookId, formData).subscribe((data: BookItemData) => {
      this.toastrService.success('Updated a new book successfully');
      this.router.navigate(['/admin/books'])
    });
  }
}
