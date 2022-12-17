import ReactDOM from "react-dom/client";
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useLocation,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './User.css';
import XMLData from './Data/venues.xml';
import axios from 'axios';
 

import dataEventDates from './Data/eventDates.xml';
 
//import dataVenues from './Data/venues.xml';
import XMLParser from 'react-xml-parser';

const convert = require("xml2js");
let venues = [{venueName:[], venueId:[],
}];

class User extends React.Component{

  /*
  //event trail
  constructor(props) {
    super(props);
    this.state = { eventModel: [] };
  }
    componentDidMount() {
      //get data request
       axios.get('http://localhost:5000/user')
       .then(res => {
        console.log(res.data);
        this.setState({ eventModel: res.data });
      })
      .catch(function (error) {
        console.log(error);
      })
    }
    render() {
      return (
        <div className="container">
          <ul class="list-group">
            {this.state.eventModel.map( (data, i) => {
              return(
                <h1>{data.venue}</h1>
              )
            })}
          </ul>
        </div>
      )

  }
  */

//waiting for mongodb venue data
  constructor(props) {
    super(props);
    this.state = { venueModel: [] };
  }
  componentDidMount() {
    //get data request
     axios.get('http://localhost:5000/user')
     .then(res => {
      console.log(res.data);
      this.setState({ venueModel: res.data });
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  render() {
    return (
      <div className="container">
      <ul class="list-group">
        {this.state.venueModel.map( (data, i) => {
        return (
        <li class="list-group-item">
          <div class="wrapper">
            <div class="link_wrapper">
              <a href='/events'>{data.locname}</a>
              <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.832 268.832">
                  <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z"/>
                </svg>
              </div>
            </div>
          </div>
        </li>
        )})}
        </ul>
      </div>
    )
  }


/*

          {this.state.venueModel.map( (data, i) => {
            return(
              <h1>{data.locname}</h1>
            )
          })}

  constructor(props) {
    super(props);
    this.state = {venueName:[], venues:[{venueName:[], venueId:[],
    }], venueId:[], count:0};
  }

 componentDidMount() {
 //get data request
  axios.get(XMLData, {
  "Content-Type": "application/xml; charset=utf-8"
   }).then(res => {
    //Storing users detail in state array object
    const jsonDataFromXml = new XMLParser().parseFromString(res.data);
    //this.setState({ venues: jsonDataFromXml.getElementsByTagName('venue') })
    this.setState({ venueName: jsonDataFromXml.getElementsByTagName('venuee') })
    this.setState({ venueId: jsonDataFromXml.getElementsByTagName('venue').id })
  }); 
}

render() {
return (
  <div className="container">
  <ul class="list-group">
    {(this.state.venueName.map((item, index) => {
    return (
    <li class="list-group-item">
      <div class="wrapper">
        <div class="link_wrapper">
          <a href=''>{item.value}</a>
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.832 268.832">
              <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z"/>
            </svg>
          </div>
        </div>
      </div>
    </li>
    )}))}
    </ul>
  </div>
)
};
*/
}

/*
function User_() {
  const [data, setData] = useState(Array.from({ length: 10 }, v => Array.from({ length: 5 }, v => null)));

  var parseString = convert.parseString;

  axios.get(XMLData, {
    "Content-Type": "application/xml; charset=utf-8"
  }).then(response => {
    parseString(response.data, (err, result) => {
      if(err) {
       //Do something
      } else {
        let copy = [...data];
        var i =0;
        var j=0;
        for (const key in result) {
          var dataset=result[key];
          for (const key in dataset) {
            var venueSet =dataset[key];
            for (const key in venueSet) {
              var venue = venueSet[key];
              for (const key in venue) {
                var detail = venue[key];
                for (const key in detail) {
                  if(i<4){
                    copy[j][i]=detail[key];
                    i+=1;
                  }else{
                    i=0;
                    j+=1;
                  }
                }
              }
            }
          }
        }
        setData(copy);
     }
    });        
  })

  function print(i){
    return(
    <div>
      <div>
      {data[0][1]}
      <br></br>
      {data[0][2]}
      </div>
    </div>);
  }

  
//make table

  return (
    <div className="User">
      <header className="User-header">
        <div>{print(0)}</div>
      </header>
    </div>
  );
}
*/

export default User;

class App extends React.Component {
  render() {
    {/* <> fragment for >1 components */}
    return (
      <> 
        <Title name={this.props.name}/>
        <BrowserRouter>
          <div>
            <ul>
              <li> <Link to="/">Home</Link> </li>
              <li> <Link to="/singleevent">Page for single event</Link> </li>
              <li> <Link to="/favorite">Favorite List</Link> </li>
            </ul>
          </div>

          <hr />

          <Routes>
            <Route path="/" element={<Title />} />
            <Route path="/singleevent" element={<Comment />} />
            <Route path="/favorite" element={<Favorite />} />
             
          </Routes>
        </BrowserRouter>
      </>  
    );
  }
}

class Title extends React.Component {
  render() {
    return (
      <header className="bg-warning">
        <h1 className="display-4 text-center">{this.props.name}</h1>
      </header>
    );
  }
}

class Comment extends React.Component {
  render() {
    return (
      <footer>
      <h3 id="comment">Feel free to leave some comments!</h3>
      <div class="containercon">
          <div id="comments"> 
            <div id="c1001" class="d-flex">
              <div class="flex-shrink-0">  
                <svg height="100" width="100">
                  <circle cx="50" cy="50" r="40" fill="green"/>
                </svg>
              </div>
              <div class="flex-grow-1">  
                <h5>1155141479@link.cuhk.edu.hk</h5>
                <p>Email me if you want to tell me something directly.</p>
              </div>
            </div>
          </div>
          <hr></hr>
          <h6>Add your comment:</h6>
          <form>
          <div class="mb-3">
            <label for="new-email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="new-email" placeholder="name@example.com"/>
          </div>
          <div class="mb-3">
            <label for="new-comment" class="form-label">Comment</label>
            <textarea class="form-control" id="new-comment" rows="3"></textarea>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="new-color" id="new-color-red" value="red"/>
            <label class="form-check-label" for="new-color-red">Red</label>
          </div>
          <div class="form-check">
              <input class="form-check-input" type="radio" name="new-color" id="new-color-green" value="green"/>
              <label class="form-check-label" for="new-color-green">Green</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="new-color" id="new-color-yellow" value="yellow"/>
              <label class="form-check-label" for="new-color-yellow">Yellow</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="new-color" id="new-color-blue" value="blue"/>
              <label class="form-check-label" for="new-color-blue">Blue</label>
            </div>
          <button type="button" class="btn btn-primary" onclick="processform()">Add comment</button>
          </form>
        </div>
      <h3>
          <a href="#top">Back</a>
      </h3>
    </footer>
  
  
    );
  }
}

const data = [
  { id: 1, name: "Event1" },
  { id: 2, name: "Event2" },
  { id: 3, name: "Event3" }
];

function Favorite() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(data);
  }, []);

  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

  function handleFavorite(id) {
    const newFavorites = favorites.map(item => {
      return item.id === id ? { ...item, favorite: !item.favorite } : item;
    });

    setFavorites(newFavorites);
  }

  return (
    <div className="App">
      <h1>Initial list</h1>
      <ul>
        {favorites.map((item, i) => (
          <li key={i}>
            {item.name}{" "}
            <button
              onClick={() => {
                handleFavorite(item.id);
              }}
            >
              {item.favorite === true ? "Remove" : "Add"}
            </button>
          </li>
        ))}
      </ul>

      <h1>Favorite list</h1>
      <ul>
        {favorites.map(item =>
          item.favorite === true ? <li key={item.id}>{item.name}</li> : null
        )}
      </ul>
    </div>
  );
}

function processform() {
  let newemail=document.querySelector("#new-email").value;
  let newcomment=document.querySelector("#new-comment").value;
  if(checkvalid(newemail)&&newemail.trim().length!==0&&newcomment.trim().length!==0){
      let newComment = document.createElement("div");
      let element = '<div><svg height="100" width="100"><circle cx="50" cy="50" r="40"></svg></div><div><h5></h5><p></p></div>';
      newComment.innerHTML = element;
      newComment.className = "d-flex";
      newComment.querySelectorAll("div")[0].className = "flex-shrink-0"; 
      newComment.querySelectorAll("div")[1].className = "flex-grow-1";  
      let lastComment = document.querySelector("#comments").lastElementChild;  
      newComment.id = 'c' + (Number(lastComment.id.substr(1)) + 1);
      newComment.querySelector("h5").innerHTML =  newemail;
      newComment.querySelector("p").innerHTML = newcomment;
      let color = document.querySelectorAll("input[name=new-color]:checked")[0].value;  
      newComment.querySelector("circle").setAttribute("fill", color);
      document.querySelector("#comments").appendChild(newComment);
      document.querySelector("form").reset();
      savefile();
  }else{
      window.alert("You have entered an invalid email address or did there is empty email/comment!");
  }
}
function checkvalid(newemail){
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(newemail.match(mailformat)){
  return true;
  }
  else{
  return false;
  }
}
function loadfile() {
  fetch('file.txt')
  .then(res => res.text())
  .then(txt => document.querySelector("#comments").innerHTML = txt);
}

function savefile() {
  fetch('file.txt', {
  method: 'PUT',
  body: document.querySelector("#comments").innerHTML
  });
}

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App name="CSCI2720 proj"/>);