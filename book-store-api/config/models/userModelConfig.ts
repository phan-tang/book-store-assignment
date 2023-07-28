import BaseModelConfig from "./baseModelConfig";

class UserModelConfig extends BaseModelConfig {
    constructor() {
        super();
        this.sortFields = [
            'id',
            'first_name',
            'last_name'
        ];
        this.defaultSortField = 'first_name';
        this.perPage = 10;
        this.filterFields = [{ type: 'boolean', key: 'is_admin' }];
    }
}

export default UserModelConfig;