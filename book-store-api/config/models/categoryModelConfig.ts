import BaseModelConfig from "./baseModelConfig";

class CategoryModelConfig extends BaseModelConfig {
    constructor() {
        super();
        this.sortFields = [
            'id',
            'name',
            'description'
        ];
        this.defaultSortField = 'name';
        this.perPage = 10;
    }
}

export default CategoryModelConfig;