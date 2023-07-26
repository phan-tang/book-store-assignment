import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ReportItemData, ReportListData } from './shared/report';

@Injectable()
export class ReportService {

    resource: string = 'reports';

    constructor(private http: HttpClient) { }

    getReports(params: string): Observable<ReportListData> {
        return this.http.get<ReportListData>(environment.apiURL + this.resource + params);
    }

    getReportByTime(time: string): Observable<ReportItemData> {
        return this.http.get<ReportListData>(environment.apiURL + `${this.resource}/${time}`);
    }

    getDetailsReportsByTime(time: string, subResource: string): Observable<ReportListData> {
        return this.http.get<ReportListData>(environment.apiURL + `${this.resource}/${subResource}/${time}`);
    }
}