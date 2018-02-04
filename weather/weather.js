const request = require('request');

var getWeather = (lat, lng, callback) => {
request({
    uri: `https://api.darksky.net/forecast/6ac7289b52348a595a1636c1cf1d96de/${lat},${lng}`,
    json: true
}, (error, response, body) => {
    if (!error && response.statusCode === 200) {
        callback(undefined, {
            temperature: body.currently.temperature,
            apparentTemperature: body.currently.apparentTemperature
                        
        })
    } else {
        callback('Couldn\'t get the weather');
    }
});
};

module.exports.getWeather = getWeather;