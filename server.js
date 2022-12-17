const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
const https = require('https');
const axios = require('axios');
const { repeat } = require("rxjs");
var DOMParser = require('xmldom');

mongoose.set('strictQuery', true);

mongoose.connect('mongodb+srv://stu060:p913492W@cluster0.wenbhsm.mongodb.net/stu060');

const login = new Schema({
    username : { type: String, required: true},
    password : { type: String, required: true},
    Identity :{ type: String, required: true},
    });
    const LocationSchema = mongoose.Schema({
        // locname, latitude, longitude
        locId: {type: Number, required: true, unique: true},
        locname: {type: String, required: true, unique: true}, 
        latitude: {type: Number, required: true},
        longitude: {type: Number, required: true},
        events: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}]
        // favorite locations
        // comments on locations
    })
    
    const EventSchema = mongoose.Schema({ 
        //title, venue, date/time, description, presenter, price
        eventId: {type: Number, required: true, unique: true},
        title: {type: String},
        venue: {type: mongoose.Schema.Types.ObjectId, ref: 'Location'},
        date: {type: Array},
        time: {type: String},
        description: {type: String},
        presenter: {type: String},
        price: {type: String}
    })
    const User = mongoose.model("logins", login);
    const Location = mongoose.model('locations', LocationSchema);
    const Event = mongoose.model('Event', EventSchema);

    app.post("/login", (req, res) => {
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


    app.post("/clean_location",(req,res)=>{
       console.log(req.body);
       Location.deleteMany().then(
        e=>{
            res.send("deleted");
        }
       ).catch(err=>{
        res.send(err);
       })
    })

    app.post("/venue_upload",(req,res)=>{

        Location.create({
            locId: req.body['id'],
            locname: req.body['vene'],
            latitude: req.body['lat'],
            longitude: req.body['long']
            }, (err,e) => {
                if (err)
                console.log(err);
                else
                res.send(
                    "ok"
                );
            });
});
   


    app.post('/xmlEvent', (req, res) => {
 
        axios.get('https://www.lcsd.gov.hk/datagovhk/event/events.xml').then((response) => {
           res.send(response.data);
    });
        

    
    });
    app.post('/xml', (req, res) => {
        console.log("addddd");
        axios.get('https://www.lcsd.gov.hk/datagovhk/event/venues.xml').then((response) => {
           res.send(response.data);
    
   
    });
});
app.listen(5000);