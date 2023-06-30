import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormItem, FormItemOption } from 'src/app/shared/components/form/form.component';
import { BookService } from '../books.service';
import { BookItemData } from '../shared/book';

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
    }
  ];
  constructor(private service: BookService) { }

  ngOnInit(): void {
    this.service.getCategories('?sort-by=name').subscribe((data: FormItemOption[]) => {
      this.fields.filter(item => item.name === 'category_name')[0].options = data;
    });
  }

  handleSubmit(value: Object) {
    this.service.createBook(value).subscribe((data: BookItemData) => {
      console.log('Created a new book successfully');
      console.log(data.data);
    });
  }
}
