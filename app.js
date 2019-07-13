var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');

var geocoding = require('./geocode');
var forecast = require('./forecast');


var app = express();

app.use(express.static('./public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


app.post('/weather', function(req, res){
    location = req.body.location;
    geocoding(location, (error,geocodeResponse)=>{
        forecast(geocodeResponse.lattitude,geocodeResponse.longitude,(error,forecastResponse)=>{
            console.log(geocodeResponse.place_name,forecastResponse);
            console.log(forecastResponse.summary + '. Temperature is '+ forecastResponse.temperature+' degrees out there !!!');
            res.json({
                place_name : geocodeResponse.place_name,
                forecastData : forecastResponse 
            });
        });
    });
    
});



app.listen(3000,()=>{
    console.log("server running on port 3000...")
});



