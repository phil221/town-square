import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const UserModel = model("users", UserSchema);

export default UserModel;