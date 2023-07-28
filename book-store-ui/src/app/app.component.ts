import { Component, OnInit } from '@angular/core';
import { CategoryService } from './admin/admin-categories/categories.service';
import { Store } from '@ngrx/store';
import { SetListCategoriesAction } from './store/actions/categories.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private store: Store, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories('/all').subscribe(({ data }) => {
      this.store.dispatch(new SetListCategoriesAction(data));
    })
  }
}
