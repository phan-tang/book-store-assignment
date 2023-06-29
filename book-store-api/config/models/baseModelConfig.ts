class BaseModelConfig {

    protected sortFields: string[];
    protected defaultSortField: string;
    protected perPage: number;
    protected page: number;

    constructor() {
        this.sortFields = [];
        this.defaultSortField = 'id';
        this.perPage = 15;
        this.page = 1;
    }

    getSortFields() {
        return this.sortFields;
    }

    getDefaultSortField() {
        return this.defaultSortField;
    }

    getPerPage() {
        return this.perPage;
    }

    getPage() {
        return this.page;
    }
}

export default BaseModelConfig;