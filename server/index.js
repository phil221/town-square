import * as dotenv from 'dotenv';
import express from 'express';
import { connect } from 'mongoose';
import _ from 'lodash';
import cors from 'cors';
import bycrpt from 'bcrypt';
import jwt from 'jsonwebtoken';
import PostModel from './models/Posts.js';
import UserModel from './models/Users.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7uukid1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)

app.get("/posts", (req, res) => {
    PostModel.find({}, (err, result) => {
        if(err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

app.get("/posts/:username", authenticateToken, (req, res) => {
    PostModel.find({}, (err, result) => {
        if(err) {
            res.json(err)
        } else {
            res.json(result.filter(post => post.username === req.params.username))
        }
    })
})

app.post("/createPost", async (req, res) => {
    const post = req.body;
    const newPost = new PostModel(post);
    await newPost.save();

    res.json(post);
})

app.put("/updatePostLikes", async (req, res) => {
    try {
        PostModel.findById(req.body._id, async (error, foundPost) => {
        foundPost.numLikes = Number(req.body.likes);
        await foundPost.save();
        })
    } catch(err){
        console.error(err)
    }

    res.send("updated");
})

app.get("/users", (req, res) => {
    UserModel.find({}, (err, result) => {
        if(err){
           res.send(err) 
        } else {
            res.send(result)
        }
    })
})

app.post("/createUser", async (req, res) => {

    try {
        const hashed = await bycrpt.hash(req.body.password, 10);
        const newUser = new UserModel({ username: req.body.username, password: hashed });
        await newUser.save();

        res.status(201).send('created user');
    } catch (err) {
        console.error(err);
        res.status(500).send('something went wrong')
    }
})

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;

        next();
    })
}

app.listen(3001, () => {
    console.log("Server listening on port 3001")
})