let url = '/weather'

const search = ()=>{

    count=0;
    let location = document.querySelector('#location').value;
    let results = document.querySelector('.results');
    let http = new XMLHttpRequest();

    http.open("POST", url, true);
    http.setRequestHeader('Content-Type', 'application/json');

    http.onreadystatechange = ()=>{
        if(http.readyState === 4 && http.status === 400){
            // console.log(http.response);
        }
        http.onloadend = ()=>{

            let res = JSON.parse(http.response);
            let img;

            switch (res.forecastData.icon) {
                case "clear-day" : 
                    img = "clear-day.jpg";
                    break;
                case "clear-night" : 
                    img = "clear-night.jpg";
                    break;
                case "rain" : 
                    img = "rain.png";
                    break;
                case "snow" : 
                    img = "snow.jpg";
                    break;
                case "sleet" : 
                    img = "sleet.png";
                    break;
                case "wind" : 
                    img = "wind.jpg";
                    break;
                case "fog" : 
                    img = "fog.jpg";
                    break;
                case "cloudy" : 
                    img = "cloudy.jpg";
                    break;
                case "partly-cloudy-day" : 
                    img = "partly-cloudy-day.jpg";
                    break;
                case "partly-cloudy-night" : 
                    img = "partly-cloudy-night.jpg";
                    break;
                
            }

            let imgPath = "./images/"+ img;

            console.log(res.forecastData.icon,imgPath);


            results.innerHTML = `
                <div class="card" style="width: 100%;">
                    <div class="card-image" style="height:200px;overflow:hidden;position:relative">
                        <img src=${imgPath} class="card-img-top" style="position:absolute;top:0;left:0;transform:translateY(-50%);">
                    </div>
                    <div class="card-body" style="position:relative">
                        <div class="palce-title" style="position:absolute;color:white;top:-50px"> ${res.place_name} </div>
                        <h4 class="card-title">${res.forecastData.summary}</h4>
                        <p class="card-text" style="float:left">Temperature is ${res.forecastData.temperature} degree celcius out there !!!</p>
                        <a href="#advanced" class="textToggle" style="float:right;color:grey;cursor:pointer;text-decoration:none;" data-toggle="collapse" onclick="textToggle()"> Show more details </a>
                        <br>
                        <div id="advanced" class="collapse in">
                            <hr>
                            Wind Speed : ${res.forecastData.windSpeed} m/s <br>
                            Atmospheric Pressure : ${res.forecastData.pressure} HectoPascals <br>
                            Humidity : ${res.forecastData.humidity} g/m3<br>
                            Precipitation Probability : ${res.forecastData.precipProbability} %<br>
                            Apparent (feels-like) Temperatute : ${res.forecastData.apparentTemperature} degree celcius<br>
                            Dew Point : ${res.forecastData.dewPoint} degree celcius<br>
                            Wind Gust : ${res.forecastData.windGust} m/s<br>
                            Wind Bearing : ${res.forecastData.windBearing} m/s<br>
                            Cloud Cover${res.forecastData.cloudCover}<br>
                            UV Index : ${res.forecastData.uvIndex}<br>
                            Visibility : ${res.forecastData.visibility}<br>
                            Ozone : ${res.forecastData.ozone} <br>
                        </div>
                    </div>
                </div>
            `
        }
    }

    // <h1>${res.place_name}</h1>
    //             <h2>${res.summary}</h2>
    //             <h3>Temperature is ${res.temperature} degree celcius out there !!!</h3>

    http.send(JSON.stringify({
        location: location
    }));

}

let count = 0;

const textToggle = ()=>{
    count++;
    let textToggle = document.querySelector('.textToggle');
    if(count%2===0){
        textToggle.innerHTML = ` Show more details `;
    } else {        
        textToggle.innerHTML = ` Show less details `;
    }
}