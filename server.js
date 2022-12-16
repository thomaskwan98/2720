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


const eventSchema = Schema({
    id: {type: String, required: true, unique: true},
    titlec: {type: String},
    titlee: {type: String},
    cat1: {type: String},
    predateC: {type: String},
    predateE: {type: String},
    progtimec: {type: String},
    progtimee: {type: String},
    venueid: {type: String, required: true, unique: true},
    venue: {type: Schema.Types.ObjectId, ref:'locationModel'},
    agelimitc: {type: String},
    agelimite: {type: String},
    pricec: {type: String},
    pricee: {type: String},
    descc: {type: String},
    desce: {type: String},
    urlc: {type: String},
    urle: {type: String},
    tagenturlc: {type: String},
    tagenturle: {type: String},
    remarkc: {type: String},
    remarke: {type: String},
    enquiry: {type: String},
    fax : {type: String},
    email : {type: String},
    saledate: {type: String},
    interbook: {type: String},
    presenterorgc: {type: String},
    presenterorge: {type: String},
    prog_image : {type: String},
    detail_image1 : {type: String},
    detail_image2 : {type: String},
    detail_image3 : {type: String},
    detail_image4 : {type: String},
    detail_image5 : {type: String},
    video_link: {type: String},
    video_link: {type: String},
    video_link: {type: String},
});

const eventModel = mongoose.model("events", eventSchema);

const venueSchema = Schema ({
    id: {type: String, required: true, unique:true},
    venuec: {type: String, required: true},
    venuee: {type: String, required: true},
    latitude: {type: String},
    longitude: {type: String},
    event: [{type: Schema.Types.ObjectId, ref:'eventModel'}],
});

const venueModel = mongoose.model('venues', venueSchema);



    app.post("/login", (req, res) => {
        console.log("in");

        console.log(req);
        console.log(req.body["name"]);
        User.findOne(
            {username: req.body["name"]}, (err, e) => {
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