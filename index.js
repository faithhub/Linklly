const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const cors = require('cors')
const server = require('http').createServer(app);
const linkRoute = require('./routes/index');
const detenv = require('dotenv-safe').config({
    allowEmptyValues: true
});


app.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', '*')
    res.header('Content-Type: application/json; charset=utf-8')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PATCH, POST, DELETE, GET')
        return res.status(200).json();
    }
})

/**
 * Routes
 */
app.use('/', linkRoute);

/**
 * Request handling
 */
app.use(morgan('dev'));

/**
 * Payload size increase
 */
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({
    limit: '50mb',
    extended: true
}));

/**
 * App Use CORS
 */
app.use(cors())


/**
 * Error page handling
 */
app.use((req, res, next) => {
    const error = new Error('Page not found');
    error.status = 404;
    next(error);
})
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

/**
 * Header authorization
 */
// var corsOptions = {
//         origin: '*',
//         optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 
//         methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//         preflightContinue: false,
//     }

/**
 * Service static files
 */
app.use(express.static(path.join(__dirname, '/harperdb/')));

/**
 * PORT LISTENING
 */
server.listen(process.env.PORT)

module.exports = app