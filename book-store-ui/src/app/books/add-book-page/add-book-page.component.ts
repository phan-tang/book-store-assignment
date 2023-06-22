import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormItem } from 'src/app/shared/components/form/form.component';

@Component({
  selector: 'app-add-book-page',
  templateUrl: './add-book-page.component.html',
  styleUrls: ['./add-book-page.component.scss']
})
export class AddBookPageComponent implements OnInit {
  addBookForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    category: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required, Validators.min(0)]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    description: new FormControl('', [Validators.required]),
  });
  fields: FormItem[] = [
    {
      name: 'title',
      title: 'Title',
      type: 'text'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'select',
      options: [
        {
          value: 'drama',
          title: 'Drama'
        },
        {
          value: 'sport',
          title: 'Sport'
        },
        {
          value: 'comedy',
          title: 'Comedy'
        }
      ]
    },
    {
      name: 'quantity',
      title: 'Quantity',
      type: 'number'
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      prefix: '$'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'textarea'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  handleSubmit(value: Object) {
    console.log('add book')
  }
}
