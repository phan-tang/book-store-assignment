import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminReportRoutingModule } from './admin-report-routing.module';

import { AdminReportPageComponent } from './admin-report-page/admin-report-page.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';

import { SharedModule } from 'src/app/shared/shared.module';
import { StatisticsComponent } from './statistics/statistics.component';
import { ReportTableComponent } from './report-table/report-table.component';
import { ReportService } from './report.service';

@NgModule({
    declarations: [
        AdminReportPageComponent,
        StatisticsComponent,
        ReportTableComponent
    ],
    imports: [
        CommonModule,
        AdminReportRoutingModule,
        SharedModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatGridListModule,
        MatExpansionModule
    ],
    providers: [ReportService]
})
export class AdminReportModule { }
