const request = require('request');


var getLocation = (address) => {
    request(
        {url: 'http://maps.googleapis.com/maps/api/geocode/json?address=7 adelaide lane blayney',
        json: true
    }, (error, response, body) => {
        console.log('error:', error); // Print the error if one occurred
        console.log('address:', address); // Print the HTML for the Google homepage.
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
       //var bodyTwo = JSON.parse(body);
       //var lat =  bodyTwo.results[0].geometry.location.lat;
       //var lng =  bodyTwo.results[0].geometry.location.lng;
       console.log(`lat: ${body.results[0].geometry.location.la}`); // Print the HTML for the Google homepage.
       console.log(`lng: ${body.results[0].geometry.location.lng}`); // Print the HTML for the Google homepage.
    })
};

module.exports = {
    getLocation
};