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
    published: {
        type: Date,
        required: true
    },
    numLikes: {
        type: Number,
        required: false
    }
})

const PostModel = model("posts", PostSchema);

export default PostModel;