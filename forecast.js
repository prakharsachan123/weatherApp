var request = require('request');

const forecast = (lattitude,longitude,callback)=>{

    var url = 'https://api.darksky.net/forecast/da08573c877f1162bfdf84906676d0bf/'+longitude+','+lattitude+'?exclude=[minutely,hourly,daily]&units=si';

    request({url: url, json:true},(error,response)=>{
        if(error){
            console.log("unable to connect to weather services!!!")
            return;
        } else {
           

            error=undefined;
            data = response.body.currently;
            callback(error,data);
        }
    });
    
}

module.exports = forecast;