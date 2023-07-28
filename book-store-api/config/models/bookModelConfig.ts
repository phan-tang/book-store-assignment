import BaseModelConfig from "./baseModelConfig";

class BookModelConfig extends BaseModelConfig {
    constructor() {
        super();
        this.sortFields = [
            'id',
            'name',
            'summary',
            'price',
            'author_name',
            'category_name'
        ];
        this.defaultSortField = 'name';
        this.perPage = 10;
        this.filterFields = [
            { type: 'string', key: 'category_name' },
            { type: 'string', key: 'author_name' }
        ];
    }
}

export default BookModelConfig;