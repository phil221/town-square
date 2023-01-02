import * as dotenv from 'dotenv';
import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import PostModel from './models/Posts.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7uukid1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)

app.get("/getPosts", (req, res) => {
    PostModel.find({}, (err, result) => {
        if(err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

app.post("/createPost", async (req, res) => {
    const post = req.body;
    const newPost = new PostModel(post);
    await newPost.save();

    res.json(post);
})

app.listen(3001, () => {
    console.log("Server listening on port 3001")
})