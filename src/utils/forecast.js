const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.openweathermap.org/data/2.5/weather?lat=" + encodeURIComponent(latitude) + "&lon=" + encodeURIComponent(longitude) + "&appid=1a8ab0e6a7f9b37aa78eaf1925841908&units=metric&lang=it";

    request({url:url, json:true}, (error, response) => {

        if(error){
            callback("Impossibile connettersi al servizio di meteo", undefined);
        }       
        else if(response.body.message){
            callback("Coordinate sbagliate", undefined);
        }
        else{
            callback(undefined, "Fuori c\'è: " + response.body.weather[0].description + ".La temperatura minima è " + response.body.main.temp_min + " gradi. La temperatura massima è " + response.body.main.temp_max + " gradi.La velocità del vento è " + response.body.wind.speed + " km/h")
        }
    })
}


module.exports = {
    forecast: forecast
}