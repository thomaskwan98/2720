const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));

const bcrypt = require("bcrypt"); 

mongoose.set('strictQuery', true);

mongoose.connect('mongodb+srv://stu060:p913492W@cluster0.wenbhsm.mongodb.net/stu060');

const login = new Schema({
    username : { type: String, required: true},
    password : { type: String, required: true},
    Identity :{ type: String, required: true},
    });

    const User = mongoose.model("logins", login);

    app.post("/login", (req, res) => {
        console.log("in");

        console.log(req);
        console.log(req.body["name"]);
        User.findOne(
            {Username: req.body["name"]}, (err, e) => {
            console.log(e);
                if (err) {
                    res.send(err);
                    console.log("no");
                }
                else if (e === null) {
                    res.status(401);
                    res.send("no this user");
                }
                else {
                    if (req.body["password"]!= e.password) {
                        res.status(401);
                        res.send("wrongPw");
                    }
                    else {
                        res.status(200);
                        console.log("correct");
                        res.send(e);
                    }
                }
            });
        });

    app.get("/", (req, res) => {
        User.find({}, (err, e) => {
            if (err) {
                res.send(err);
            }
            else {
                res.status(200);
                res.send(e);
            }
        });
    });
app.listen(5000);