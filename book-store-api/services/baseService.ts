import { injectable } from "inversify";
import { mongoose } from "../config/database";
import { IQueryCondition } from "../interfaces/model";

@injectable()
class BaseService {

    constructor() { }

    async checkUniqueTrue(model: typeof mongoose.Model, queryField: string, value: any): Promise<boolean> {
        let condition: IQueryCondition = {};
        condition[queryField] = value;
        return await model.find(condition).countDocuments() === 0;
    }
}

export default BaseService;