import { injectable } from "inversify";
import { mongoose } from "../config/database";

@injectable()
class BaseService {

    constructor() { }

    async checkUniqueTrue(model: typeof mongoose.Model, queryField: string, value: any): Promise<boolean> {
        return await model.find({ [queryField]: value }).countDocuments() === 0;
    }
}

export default BaseService;