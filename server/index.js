
const express = require('express');
const app = express();
const { json } = require('body-parser');
const session = require('express-session');
require('dotenv').config();
// const  { someFunction } = require('./middlewares/checkForSession')


//middleware
const checkForSession = require('./middlewares/checkForSession');

//controllers
const swag_controller = require('./controllers/swag_controllers');
const auth_controller = require('./controllers/auth_controller');
const cart_controller = require('./controllers/cart_controller');
const search_controller = require('./controllers/search_controller');

app.use(json());
app.use(session({
    resave: false,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true

}));
app.use(checkForSession);
app.use(express.static( `${__dirname}/build`) );

//endpoint from swag
app.get('/api/swag', swag_controller.read)

//endpoints from auth_controller
app.post('/api/login', auth_controller.login)
app.post('/api/register', auth_controller.register)
app.post('/api/signout', auth_controller.signout)
app.get('/api/user', auth_controller.getUser);

//endpoints from cart_controller
app.post('/api/cart', cart_controller.add)
app.post('/api/cart/checkout', cart_controller.checkout)
app.delete('/api/cart', cart_controller.delete)

//endpoints from search_controller
app.get('/api/search', search_controller.search)

const port = process.env.SERVER_PORT || 3006;

app.listen(port, () => {
    console.log(`We are live on port: ${port}`)
})