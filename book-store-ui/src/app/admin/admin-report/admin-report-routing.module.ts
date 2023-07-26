import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminReportPageComponent } from './admin-report-page/admin-report-page.component';
import { StatisticsComponent } from './statistics/statistics.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: AdminReportPageComponent
    },
    {
        path: ':time',
        pathMatch: 'full',
        component: StatisticsComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminReportRoutingModule { }