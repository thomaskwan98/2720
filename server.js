// Admin actions:
// 1. CRUD stored "event details" in the local DB (deleting an existing location - not test map, comments, etc.)
// 2. CRUD "user data" (username and password only) (deleting an existing user - not test coments, etc.)
// 3. Log out as admin

//CRUD location and user information
const express = require('express');
const app = express();
const cors = require('cors');
const path =require('path');
app.use(cors());
const bcrypt = require('bcrypt'); // need "npm install bcrypt"
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://stu075:p492470W@cluster0.qsanyuv.mongodb.net/stu075'); // currently using my account

const login = mongoose.Schema({
    // userid: {type: Number, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}, // hash
    Identity: {type: String, required: true}
    // favorite: [{type: String}], // favorite locations
    // isAdmin: {type: Boolean, requred: true} // admin
})

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
    date: {type: String}, // predateE
    time: {type: String},
    description: {type: String},
    presenter: {type: String},
    price: {type: String}
})

const User = mongoose.model('Login', login);
// const User = mongoose.model('User', userschema);
const Location = mongoose.model('Location', LocationSchema);
const Event = mongoose.model('Event', EventSchema);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const fs = require('fs');

const db = mongoose.connection;
db.on('error', console.error.bind(console,'Connection error:'));
db.once('open', () => {
    console.log('DB connection successful');

    //ESTR 4.
    const requestLogNode = (req, res, next) =>{
        const user_ip = req.ip;
        const user_time = (new Date()).toLocaleString('en-GB');
        const user_agent = req.get('user-agent');
        const user_method = req.method;
        const protocol = req.protocol;
        const host = req.hostname;
        const url = req.originalUrl;
        
        const fullUrl = `${protocol}://${host}${url}`
        const user_logNode = "{\nUser IP: " + user_ip + "\nUser browser info: " +
                            user_agent + "\nDate and Time: " + user_time +
                            "\nRequest Method: " + user_method + "\nRequest URL: " +
                            fullUrl + "\n}\n"; // \n -> <br>
        
        req.requestLogNode = user_logNode;
        next();
    }
    app.use(requestLogNode);

// CRUD EVENT DETAILS
// C: create new events on location
    app.post('/admin/eventCreate', (req,res)=>{
        //const logNode = req.requestLogNode;

        filePath = __dirname + '/log.txt';
        let s = req.requestLogNode; 
        fs.appendFile(filePath, s, (err) => {if (err) console.log(err)});

        Location.findOne({locId: req.body['locId']}, (err,e)=>{
            if(err)
                res.send(err);
            else{
                Event.create([{
                    eventId: req.body['eventId'], 
                    title: req.body['title'],
                    venue: e._id,
                    date: req.body['date'],
                    time: req.body['time'],
                    description: req.body['desc'],
                    presenter: req.body['org'],
                    price: req.body['price']
                    }],(err,e1) => {
                        if (err){ 
                            //console.log(err);
                            res.send(err);
                        }
                        else
                            //res.send(logNode);
                            res.send('Event created successfully'); // redirect to here? to be confirmed
                });
            }
        });
    });

// R: retrieve details (show/read all details)
    app.get('/admin/events', (req,res) => {

        filePath = __dirname + '/log.txt';
        let s = req.requestLogNode; 
        fs.appendFile(filePath, s, (err) => {if (err) console.log(err)});

        var buf = "Event(s) in the database: <br><br>";
        Event.find({}, {eventId: 1, title:1, venue:1, date: 1, time:1, description:1, presenter:1, price: 1, _id: 0})
        .populate('venue', 'locId locname -_id')
        .exec( (err, events) => {
                // console.log(err); // for not existing eventId -> err: null, event: null
                // console.log(event); // for existing eventId -> err: null, event: (data)
            if (err) res.send(err);
            else if ( events.length )
            if (events.length > 0) {
                for (var i = 0; i < events.length; i++) {
                    buf +=
                        "EventId: " + events[i].eventId + "<br>" + 
                        "Event title: " + events[i].title + "<br>" +
                        "Event venue: { " + 
                        "Event locationId: " + events[i].venue.locId + 
                        ", Event location name: " + events[i].venue.locname + " }" + "<br>" + 
                        "Event date: " + events[i].date + "<br>" +
                        "Event time: " + events[i].time + "<br>" +
                        "Event description: " + events[i].description + "<br>" +
                        "Event presenter: " + events[i].presenter + "<br>" +
                        "Event price: " + events[i].price + "<br>" + "<br>";
                }
                buf += "<br>";
            }
            res.send(buf);
        }); 
    });

// U: update event details
    app.post('/admin/eventUpdate', (req,res) => {

        filePath = __dirname + '/log.txt';
        let s = req.requestLogNode; 
        fs.appendFile(filePath, s, (err) => {if (err) console.log(err)});

        // update changes
        Location.findOne({locId: req.body['locId']})
        .exec( (err, location) => {
            if (err) res.send(err);
            else {
                Event.findOneAndUpdate({eventId: req.body['eventIdU']}, {
                    title: req.body['titleU'],
                    venue: location._id,
                    date: req.body['dateU'],
                    time: req.body['timeU'],
                    description: req.body['descU'],
                    presenter: req.body['orgU'],
                    price: req.body['priceU'] })
                .exec( (err, event) => {
                    console.log(event);
                    if (err) res.send(err);
                    else {
                        res.send('Event updated successfully'); 
                    }
                });
            }
        });
    });

// D: delete details
    app.post('/admin/eventDelete', (req,res)=>{

        filePath = __dirname + '/log.txt';
        let s = req.requestLogNode; 
        fs.appendFile(filePath, s, (err) => {if (err) console.log(err)});

        Event.findOneAndDelete({ eventId: req.body['eventIdD'] }, (err,ev)=> {
        if(err) res.send(err)
        else {
            if (ev == null)
                res.send('Event not found');
            else { res.send('Successfully deleted event: ' + req.body['eventIdD']); }
        }
        // else if(!ev) res.send("Event not found")
        // else res.send("Deleted event" + req.body['eventIdD'])
        });
    });
    
// CRUD USER DATA
// C: create user data (username & pw only)
    app.post('/admin/userCreate', (req,res) => {

        filePath = __dirname + '/log.txt';
        let s = req.requestLogNode; 
        fs.appendFile(filePath, s, (err) => {if (err) console.log(err)});

        if (req.body['username'] == null) {
            res.send("Empty username.");
        } 
        else if (req.body['password'] == null) {
            res.send("Empty password.");
        }
        else{
            User.find({username: req.body['username']}, (err,e)=>{
                if(e.length > 0){
                    res.send("User already exists");
                }
                else{
                    User.findOne({}, (err, e1) => {
                        if (err) res.send(err);
                        else{
                            User.create({
                            //     userid: Number(e1.userid+1),
                                username: req.body['username'],
                                password: bcrypt.hashSync(req.body['password'],10), // hash
                                identity: "User"
                            }, (err,e2)=>{
                                if(err) res.send(err);
                                else res.send('User created successfully');
                            });
                        }
                    });
                }
            });
        }
    });

// R: show user data (username & pw only)
    app.get('/admin/users',  (req, res)=> {

        filePath = __dirname + '/log.txt';
        let s = req.requestLogNode; 
        fs.appendFile(filePath, s, (err) => {if (err) console.log(err)});

        var buf = "User(s) in the database: <br><br>";
        User.find({isAdmin: false}).exec(
            (err, users) => {
                if (err) res.send(err);
                else if( users.length )
                if (users.length > 0) {
                    for (var i = 0; i < users.length; i++) {
                        buf +=
                            "User name: " + users[i].username + "<br>" +
                            "User password: " + users[i].password + "<br>" + "<br>";
                        }
                        buf += "<br>";
                    }
                res.send(buf);
            });
    });

// U: update user data (username & pw only)
    app.post('/admin/userUpdate', (req,res)=>{

        filePath = __dirname + '/log.txt';
        let s = req.requestLogNode; 
        fs.appendFile(filePath, s, (err) => {if (err) console.log(err)});

        User.findOneAndUpdate({ username: req.body['usernameU'] }, {
            username: req.body['usernameU'],
            password: bcrypt.hashSync(req.body['passwordU'],10)})
        .exec( (err, e) => {
            console.log (e);
            if (err) res.send(err);
            else {
                res.send('User data updated successfully'); 
            }
        });
    });

// D: delete user data (username & pw only)
    app.post('/admin/userDelete', (req,res)=>{

        filePath = __dirname + '/log.txt';
        let s = req.requestLogNode; 
        fs.appendFile(filePath, s, (err) => {if (err) console.log(err)});

        User.findOneAndDelete({ username: req.body['usernameD'] }, (err,user)=> {
        if(err) res.send(err)
        else if(!user) res.send("User not found.")
        else res.send("Deleted user: " + req.body['usernameD'])
        })
    });

// ESTR 1: Charting Data
    app.get('/venueprice/:name', (req,res)=>{

        filePath = __dirname + '/log.txt';
        let s = req.requestLogNode; 
        fs.appendFile(filePath, s, (err) => {if (err) console.log(err)});

            Location.findOne({locname: req.params['name']})
            .populate('events')
            .exec( (err,loc)=>{
                if(err) res.send(err);
                else{
                    var prices = [];
                    var evts = [];
                    for(var j=0;j<loc.events.length;j++){
                        prices[j] = "'" + loc.events[j].price + "'";
                        evts[j] = "'" + loc.events[j].title + "'";
                    }
                    //console.log(prices);
                    var htmltext = `<header>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
                </header>
                <body>
                    <canvas id="myChart" style="width:100%;max-width:600px"></canvas>
                    <script>
                    function charting(venue_name, x_events, y_prices){
                        var xValues = x_events;
                        var yValues_get = [];
                        var yValues = [];
                        for(var i=0; i<y_prices.length; i++){
                            yValues_get[i] = y_prices[i].match(${/\d+/g});
                            yValues[i] = Math.max(...(yValues_get[i] || []));
                        }
                        
                        var barColors = "red";//["red", "green","blue","orange","brown"];
                        
                        new Chart("myChart", {
                          type: "bar",
                          data: {
                            labels: xValues,
                            datasets: [{
                              backgroundColor: barColors,
                              data: yValues
                            }]
                          },
                          options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero : true
                                    }
                                }]
                            },
                            legend: {display: false},
                            title: {
                              display: true,
                              text: "Price distribution of " + venue_name
                            }
                          }
                        });
                    }
                    charting('`+loc.locname+"',["+evts+'],['+prices+`]);
                    </script>
                </body>`
                res.send(htmltext);
                
            }
        });
    });

});

const server = app.listen(3000);
// https://github.com/fungking07/csci2720-project/blob/master/App.jsx
// https://github.com/fungking07/csci2720-project/blob/master/adminregister.html
// https://github.com/fungking07/csci2720-project/blob/master/server.js

//create event/location details, delete details, show contents, update(change) details
