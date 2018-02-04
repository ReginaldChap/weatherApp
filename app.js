const yargs = require('yargs');
const axios = require('axios');


const argv = yargs
    .options({
        a: {
            demand: true, 
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find address');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/6ac7289b52348a595a1636c1cf1d96de/${lat},${lng}`
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl)
}).then((response) => {
    var temp = response.data.currently.temperature;
    var apparentTemp = response.data.currently.apparentTemperature;
    console.log(`the temp is ${temp}, but it feels like ${apparentTemp}`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log("unable to connect to API servers");
    } else {
        console.log(e.message);
    }
})
