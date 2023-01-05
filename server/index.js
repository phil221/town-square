import * as dotenv from 'dotenv';
import express from 'express';
import { connect } from 'mongoose';
import _ from 'lodash';
import cors from 'cors';
import bycrpt from 'bcrypt';
import PostModel from './models/Posts.js';
import UserModel from './models/Users.js';

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

app.put("/updatePostLikes", async (req, res) => {
    console.log("---- RUNNING put operation... ----")

    try {
        await PostModel.findById(req.body._id, (error, foundPost) => {
            foundPost.numLikes = Number(req.body.likes);
            foundPost.save();
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

app.post("/users/login", async(req, res) => {

    UserModel.find({}, async (err, data) => {
        if(err) {
            res.status(400).send('user not found');
        } else {
            const user = _.find(data, function(item) {
                if(item.username === req.body.username){
                    return item;
                } 
            });

            try {
                if(await bycrpt.compare(req.body.password, user.password)){
                    res.send('logged in!')
                } else {
                    res.send('not allowed')
                }
            } catch (error) {
                console.log(error)
                res.status(500).send()
            }
        }
    })
})

app.listen(3001, () => {
    console.log("Server listening on port 3001")
})