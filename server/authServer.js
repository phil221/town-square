import * as dotenv from 'dotenv';
import express from 'express';
import { connect } from 'mongoose';
import _ from 'lodash';
import cors from 'cors';
import bycrpt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from './models/Users.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7uukid1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)

const refreshTokens = [];

app.post("/token", (req, res) => {
    const refreshToken = req.body.token;
    if(refreshToken == null) return res.sendStatus(401);
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ name: user.name });

        res.json({ accessToken })
    })
})

app.delete("/logout", (req, res) => {
    refreshTokens = refreshTokens.filter(refToken => refToken !== req.body.refreshToken);
    res.sendStatus(204);
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
                    const accessToken = generateAccessToken({ name: req.body.password });
                    const refreshToken = jwt.sign({ name: req.body.password }, process.env.REFRESH_TOKEN_SECRET)
                    res.json({ accessToken, refreshToken })
                    refreshTokens.push(refreshToken);
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

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '45s' })
}

app.listen(3002, () => {
    console.log("Auth server listening on port 3002")
})