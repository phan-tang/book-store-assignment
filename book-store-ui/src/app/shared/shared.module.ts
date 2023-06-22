import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavItemComponent } from './components/nav-item/nav-item.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { FormComponent } from './components/form/form.component';
import { FormErrorMessageComponent } from './components/form-error-message/form-error-message.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        NavItemComponent,
        PaginatorComponent,
        FormComponent,
        FormErrorMessageComponent,
        MainLayoutComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        MatGridListModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        PaginatorComponent,
        FormComponent,
        MainLayoutComponent
    ],
    providers: [],
    bootstrap: []
})
export class SharedModule { }