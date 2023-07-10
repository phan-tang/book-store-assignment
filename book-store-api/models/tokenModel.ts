import { mongoose } from '../config/database';
import { IToken } from '../interfaces/model';

const Schema = mongoose.Schema;

const TokenSchema = new Schema<IToken>({
    refresh_token: {
        type: String,
        required: true,
    },
    expires_in: {
        type: Date,
        required: true,
    }
});

TokenSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Token = mongoose.model('Token', TokenSchema);

export default Token;

