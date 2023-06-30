import { mongoose } from '../config/database';
import { IUser } from '../interfaces/model';

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUser>({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    salt: {
        type: Number,
        default: 10
    },
    is_admin: {
        type: Boolean,
        default: 0
    }
});

UserSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const User = mongoose.model('User', UserSchema);

export default User;

