/**
 * CSCI2720/ESTR2106 Course Project
 * A Social Map of Events
 *
 * We declare that the assignment here submitted is original
 * except for source material explicitly acknowledged,
 * and that the same or closely related material has not been
 * previously submitted for another course.
 * We also acknowledge that we are aware of University policy and
 * regulations on honesty in academic work, and of the disciplinary
 * guidelines and procedures applicable to breaches of such
 * policy and regulations, as contained in the website.
 *
 * University Guideline on Academic Honesty:
 *   http://www.cuhk.edu.hk/policy/academichonesty
 * Faculty of Engineering Guidelines to Academic Honesty:
 *   https://www.erg.cuhk.edu.hk/erg/AcademicHonesty
 *
 * Student Name: TANG KING HEI <fill in for all members>
 * Student ID  : 1155126530 <fill in for all members>
 * Date        : 17/12/2022 <fill in yourself>

We have read the article carefully: http://www.cuhk.edu.hk/policy/academichonesty and include the required declaration

Group members:
TANG KING HEI 1155126530
ZIJUN QIU 1155160247
LIU YANG 1155141479
SU ZIE LEE 1155130593
KWAN LONG KIN 1155137891
LAI CHUEN FUNG 115514443
 */


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

const eventModel = mongoose.model("eventdatas", eventSchema); //'events' temporary

const venueSchema = Schema ({
    id: {type: String, required: true, unique:true},
    venuec: {type: String, required: true},
    venuee: {type: String, required: true},
    latitude: {type: String},
    longitude: {type: String},
    events: [{type: Schema.Types.ObjectId, ref:'eventModel'}],
});

const venueModel = mongoose.model('locations', venueSchema); //'venues' temporary

//merge the two schemas by the shared id
/*
db.venueModel.aggregate([
    { $lookup:
        {
           from: "events",
           localField: "id",
           foreignField: "venueid",
           as: "events"
        }
    }
]).pretty();
*/

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

    app.get('/user', (req, res) => {
        console.log('pass');
        //user action, table

        //Find all docs that have at least two name array elements.
        venueModel
        //.find({ 'events.2': {$exists: true} })
        .find({})
        //.populate('events')
        .exec( (err, venueItem) => {
            if (err) {res.send(err);}
            else {
                res.send(venueItem);
                /*
                eventModel
                .find({})
                .exec( (error, eventItem) => {
                    if (error) {res.send(error);}
                    else { 
                        res.send(venueItem, eventItem);
                    }
                });
                 */       
            }
        });
    });

    app.get('/events', (req, res) => {
        console.log('event testing');
        eventModel
        .find({})
        .exec( (err, eventItem) => {
            if (err) {res.send(err);}
            else {
                res.send(eventItem);
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