import { mongoose } from '../config/database';
import { IBook } from '../interfaces/model';

const Schema = mongoose.Schema;

const BookSchema = new Schema<IBook>({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 30
    },
    author_name: {
        type: String,
        required: true
    },
    category_name: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    final_price: {
        type: Number,
        min: 1
    },
    image: {
        type: String,
        default: ""
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    }
});

BookSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Book = mongoose.model('Book', BookSchema);

export default Book;

