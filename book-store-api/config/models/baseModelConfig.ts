class BaseModelConfig {

    protected sortFields: string[];
    protected defaultSortField: string;
    protected perPage: number;
    protected page: number;
    protected filterFields: {
        type: 'boolean' | 'string' | 'number';
        key: string;
    }[];

    constructor() {
        this.sortFields = [];
        this.defaultSortField = 'id';
        this.perPage = 15;
        this.page = 1;
        this.filterFields = [];
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

    getFilterFields() {
        return this.filterFields;
    }

    getFilterField(key: string) {
        let filterField = this.filterFields.filter((field) => field.key === key);
        return filterField.length > 0 ? filterField[0] : null;
    }
}

export default BaseModelConfig;