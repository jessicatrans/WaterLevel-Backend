// index.js
// This is our main server file

// include express
const express = require("express");
const fetch = require('cross-fetch');
// create object to interface with express
const app = express(); 

// gets data out of HTTP request body 
// and attaches it to the request object
const bodyParser = require('body-parser');
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(express.json());

// MEEP-----------
// hardcode date for now
// const dates = ["April 2022"];

// -----------


// Code in this section sets up an express pipeline

// print info about incoming HTTP request 
// for debugging
app.use(function(req, res, next) {
  console.log(req.method,req.url);
  next();
})

// No static server or /public because this server
// is only for AJAX requests
// MEEP-----------
app.post("/query/getWaterData", async function(request, response, next) {
  console.log(request.body);
  // let answer = await lookUpWaterData(dates);
  let answer = await lookUpWaterData(request.body);
  response.json(answer);  
});
//-----------


// respond to all AJAX querires with this message
app.use(function(req, res, next) {
  res.json("This is the server dummy. :P");
});

// end of pipeline specification

// Now listen for HTTP requests
// it's an event listener on the server!
const listener = app.listen(3000, function () {
  console.log("The static server is listening on port " + listener.address().port);
});


// MEEP-----------
async function lookUpWaterData(date) {
  console.log("date: ", date.year);
  // find the api url
  const api_url = "https://cdec.water.ca.gov/dynamicapp/req/JSONDataServlet?Stations=SHA,ORO,CLE,NML,SNL,DNP,BER&SensorNums=15&dur_code=M&Start=" + date.year + "-" + date.month + "-01&End=" + date.year + "-" + date.month + "-01";
  // send it off
  let fetch_response = await fetch(api_url);
  let data = await fetch_response.json();
  let returnArray = [];
  for (let i = 0; i < data.length; i++) {
    console.log("name: ", data[i].stationId, "current: ", data[i].value);
    returnArray.push(data[i].value);
  }
  console.log("values: ",returnArray);
  return returnArray; // return only an array of the water levels for the seven big reservoirs
}
// -----------
