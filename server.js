const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;
const User = require('./models/users');

// Import the database connection
const sequelize = require('./database');

// Import controllers
const homeController = require('./controllers/homeController');
const blogController = require('./controllers/blogController');
const errorController = require('./controllers/errorController');
const exploreController = require('./controllers/exploreController');
const howitworksController = require('./controllers/howitworksController');
const loginFormController = require('./controllers/loginForm');
const registerFormController = require('./controllers/registerForm');
const reviewsController = require('./controllers/reviewsController');
const subscribeController = require('./controllers/subscribeController');
const userRegisterationController = require('./controllers/registerUser');

// Set engine and static assets
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

// Database Connection Test
sequelize.authenticate()
   .then(() => console.log('Database connected.'))
   .catch(err => console.error('Unable to connect to the database:', err));

// Express session 
app.use(session({
   secret: 'keyboard cat',
   resave: false,
   saveUninitialized: true
   //cookie: { secure: true } // Uncomment this if using HTTPS
}));

global.loggedIn = null;
global.userType = null;

app.use("*", (req, res, next) => {
   loggedIn = req.session.userId;
   userType = req.session.userType;
   next();
});

// Set the routes
app.get('/', homeController);
app.get('/blog', blogController);
app.get('/error', errorController);
app.get('/explore', exploreController);
app.get('/howitworks', howitworksController);
app.get('/login', loginFormController);
app.get('/register', registerFormController);
app.get('/reviews', reviewsController);
app.get('/subscribe', subscribeController);
app.post('/user/register', userRegisterationController);

// Error Routes
app.use(errorController.notFound);
app.use(errorController.serverError);

// Start server
app.listen(port, () => {
   console.log(`Server started on port: ${port}`);
});
