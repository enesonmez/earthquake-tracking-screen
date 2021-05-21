var express = require('express');
var app = express();
const request = require('request');

// set the view engine to ejs
app.set('view engine', 'ejs');

var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

// index page
app.get(['/','/hourly'], function(req, res) {
  
  request('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson', { json: true }, (err, resp, body) => {
    if (err) { return console.log(err); }
    var features = resp.body.features
    var lat = []
    var long = []
    var place = []
    var mag = []
    var timestamp = []
    
    features.forEach(element => {
      lat.push(element.geometry.coordinates[1])
      long.push(element.geometry.coordinates[0])
      place.push(element.properties.place + "^")
      mag.push(element.properties.mag)
      timestamp.push(element.properties.time)
    });
    var active = "hour"
    res.render('index', {latitude: lat, longitude: long, place: place, mag: mag, timestamp: timestamp, active: active})
  });
});

app.get('/daily', function(req, res) {
  
  request('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson', { json: true }, (err, resp, body) => {
    if (err) { return console.log(err); }
    var features = resp.body.features
    var lat = []
    var long = []
    var place = []
    var mag = []
    var timestamp = []
    
    features.forEach(element => {
      lat.push(element.geometry.coordinates[1])
      long.push(element.geometry.coordinates[0])
      place.push(element.properties.place + "^")
      mag.push(element.properties.mag)
      timestamp.push(element.properties.time)
    });
    var active = "day"
    res.render('index', {latitude: lat, longitude: long, place: place, mag: mag, timestamp: timestamp, active: active})
  });
});

app.get('/weekly', function(req, res) {
  
  request('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson', { json: true }, (err, resp, body) => {
    if (err) { return console.log(err); }
    var features = resp.body.features
    var lat = []
    var long = []
    var place = []
    var mag = []
    var timestamp = []
    
    features.forEach(element => {
      lat.push(element.geometry.coordinates[1])
      long.push(element.geometry.coordinates[0])
      place.push(element.properties.place + "^")
      mag.push(element.properties.mag)
      timestamp.push(element.properties.time)
    });
    var active = "week"
    res.render('index', {latitude: lat, longitude: long, place: place, mag: mag, timestamp: timestamp, active: active})
  });
});

app.listen(8080);
console.log('Server is listening on port 8080');