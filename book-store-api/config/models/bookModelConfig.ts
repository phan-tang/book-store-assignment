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
        ];
        this.defaultSortField = 'name';
        this.perPage = 10;
    }
}

export default BookModelConfig;