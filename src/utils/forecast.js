const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=dfbe20349050d4bbad2b6481437ec36b&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true}, (error, {body}) => {
        if (error){
            callback("Unable to connect to forecasting service", undefined)
        } else if (body.error) {
            callback("Unable to find location", undefined)
        } else {
            const chanceOfPrecip = body.current.precip * 100
            callback(undefined, `It is currently ${body.current.weather_descriptions[0]} with a temperature of ${body.current.temperature} degrees. However, it feels like ${body.current.feelslike} degrees. The chance of precipitation is of ${chanceOfPrecip}%.`)
        }
    
    })
}

module.exports = forecast