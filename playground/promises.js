const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);

    request({
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            reject("Cant connect to server");
        } else if (body.status === "ZERO_RESULTS") {
            reject("address not found");
        } else if (body.status === "OK") {
            resolve({
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
    });
};

geocodeAddress('27adows').then((location) => {
//things went well
console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
//something fuicked up
console.log(errorMessage);
});