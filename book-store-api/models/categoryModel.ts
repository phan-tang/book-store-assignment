import { mongoose } from '../config/database';
import { ICategory } from '../interfaces/model';

const Schema = mongoose.Schema;

const CategorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
});

CategorySchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;

