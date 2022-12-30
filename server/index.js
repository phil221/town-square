require('dotenv').config();
const express = require('express');
const app = express();
const moongose  = require('mongoose');
const UserModel = require('./models/Users');

moongose.connect(`mongodb+srv://pomeckley:${process.env.DB_PASS}@cluster0.7uukid1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)

app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
        res.json(err ? err : result);
    })
})

app.post("/createUser", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();

})

app.listen(3001, () => {
    console.log("Server listening on port 3001")
})