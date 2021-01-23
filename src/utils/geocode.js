const request = require("request");

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibGVvbmFyZG9mZGNjZCIsImEiOiJja2lhazg5aW4wamp0MnJya2N1aDJiaGo5In0.VN9s3P9zz0O8P0duiGhP6g&limit=1&language=it"

    request({url: url, json : true }, (error, response) => {

        if(error)
        {
            callback("Unable to connect to the location services !", undefined);

        }else if (response.body.features.length === 0) {

            callback("The name that you've searched for doesn't exist", undefined)
        }
        else{
            
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
        
    })

}

module.exports = {
    geocode: geocode
}