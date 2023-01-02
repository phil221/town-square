import { Schema, model } from 'mongoose';

const PostSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
})

const PostModel = model("posts", PostSchema);

export default PostModel;