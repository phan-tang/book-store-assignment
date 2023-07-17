import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BookService } from 'src/app/books/books.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-book-details',
  templateUrl: './admin-book-details.component.html',
  styleUrls: ['./admin-book-details.component.scss']
})
export class AdminBookDetailsComponent implements OnInit {
  bookId: string = '';
  constructor(private service: BookService, private toastrService: ToastrService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['id'];
  }

  handleDeleteBook() {
    this.service.deleteBook(this.bookId).subscribe(() => {
      this.toastrService.success('Deleted this book successfully');
      this.router.navigate(['/admin/books'])
    });
  }
}
