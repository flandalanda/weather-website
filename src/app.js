// Core modules
const path = require('path')

// NPM modules
const express = require('express')
const hbs = require('hbs')

// Custom modules
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather app",
        name: "Luis Landa"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "This is the about page",
        name: "Luis Landa"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Helping is my business ... and business sucks",
        name: "Luis Landa"
    })
})

app.get('/weather', (req, res) => {
    if (req.query.address === undefined) {
        res.send({
            error: 'An address must be specified'
        })
    } else {

        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    
            if (error){
                res.send({ error })
            } else {
                
                forecast(latitude, longitude, (error, forecastData) => {
                    if (error){
                        res.send({ error })
                    } else {
                        res.send({
                            forecast: forecastData,
                            location,
                            address: req.query.address
                        })
                    }
                })
            }
        })

        
    }
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: "404",
        name: "Luis Felipe Landa",
        errorMessage: "Help article not found"
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: "You must provide a search term"
        })
    } else {
        console.log(req.query)
        res.send({
            products: []
        })
    }
    
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Luis Felipe Landa",
        errorMessage: "Page not found"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})