const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=dfbe20349050d4bbad2b6481437ec36b&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true}, (error, {body}) => {
        if (error){
            callback("Unable to connect to forecasting service", undefined)
        } else if (body.error) {
            callback("Unable to find location", undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]} It is currently ${body.current.temperature} degrees. However, it feels like ${body.current.feelslike}`)
        }
    
    })
}

module.exports = forecast