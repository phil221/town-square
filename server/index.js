import * as dotenv from 'dotenv';
import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import UserModel from './models/Users.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

connect(`mongodb+srv://pomeckley:${process.env.DB_PASS}@cluster0.7uukid1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)

app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
        if(err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

app.post("/createUser", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();

    res.json(user);
})

app.listen(3001, () => {
    console.log("Server listening on port 3001")
})