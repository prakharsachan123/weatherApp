var request = require('request');

const geocoding = (address, callback)=>{

    var lattitude,longitude;
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYW51ajEyMSIsImEiOiJjanVmZGVldGowM3lrM3lvYmY0Zjd6MmR5In0.6lKQ1ATz7P1n9Au1HCDPAw';

    request({url: url, json:true},(error,response)=>{
        if(error){
            console.log("unable to connect to geocoding services!!!")
            return;
        } else {
            lattitude = response.body.features[0].center[0];
            longitude = response.body.features[0].center[1];
            // console.log(lattitude, longitude);
            error=undefined;
            data = {
                place_name: response.body.features[0].place_name,
                lattitude,
                longitude
            }
            callback(error,data);
        }
    });

    
}

module.exports = geocoding;