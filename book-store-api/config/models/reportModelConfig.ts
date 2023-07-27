import BaseModelConfig from "./baseModelConfig";

class ReportModelConfig extends BaseModelConfig {
    constructor() {
        super();
        this.sortFields = [
            'report_time',
            'authors',
            'categories',
            'books',
            'price',
            'average_price',
            'final_price',
            'average_final_price',
            'quantity'
        ];
        this.defaultSortField = 'report_time';
        this.perPage = 10;
    }
}

export default ReportModelConfig;