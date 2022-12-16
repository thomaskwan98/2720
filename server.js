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

    const User = mongoose.model("logins", login);

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



    app.post("/venue_upload",(req,res)=>{
       console.log(req.body);
    })




    app.post('/xml', (req, res) => {
 
        axios.get('https://www.lcsd.gov.hk/datagovhk/event/venues.xml').then((response) => {
           res.send(response.data);
    
   
            });
        
    });


app.listen(5000);