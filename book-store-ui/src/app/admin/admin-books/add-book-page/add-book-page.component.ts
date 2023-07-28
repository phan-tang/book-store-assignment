import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormItem, FormItemOption } from 'src/app/shared/components/form/form.component';
import { BookItemData } from '../../../books/shared/book';

import { ToastrService } from 'ngx-toastr';
import { BookService } from '../../../books/books.service';
import { CategoryService } from '../../admin-categories/categories.service';

import { map } from 'rxjs';

@Component({
  selector: 'app-add-book-page',
  templateUrl: './add-book-page.component.html',
  styleUrls: ['./add-book-page.component.scss']
})
export class AddBookPageComponent implements OnInit {
  addBookForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    author_name: new FormControl('', [Validators.required]),
    category_name: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required, Validators.min(0)]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
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
  constructor(private bookService: BookService, private categoryService: CategoryService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.categoryService.getCategories('?sort-by=name').pipe(
      map(({ data }) => data.map(item => ({ value: item.name, title: item.name })))
    ).subscribe((data: FormItemOption[]) => {
      this.fields.filter(item => item.name === 'category_name')[0].options = data;
    });
  }

  handleSubmit(values: any) {
    let formData = this.bookService.transformToFormData(values);
    this.bookService.createBook(formData).subscribe((data: BookItemData) => {
      this.toastrService.success('Created a new book successfully');
    });
  }
}
