const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;

// Import the database connection
const sequelize = require('./database');

// Import controllers
const homeController = require('./controllers/homeController');
const businessController = require('./controllers/businessController');
const loginController = require('./controllers/loginController');
const logoutController = require('./controllers/logoutController');
const reviewController = require('./controllers/reviewController');


// Set up session
app.use(session({
   secret: 'keyboard cat',
   resave: false,
   saveUninitialized: true
}));

// Middleware for parsing request bodies
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Set view engine and static assets
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

// Database Connection Test
sequelize.authenticate()
   .then(() => console.log('Database connected.'))
   .catch(err => console.error('Unable to connect to the database:', err));

// Routes
app.get('/', homeController);
app.get('/login', loginController.get);
app.post('/login', loginController.post);
app.get('/logout', logoutController);
app.post('/business/add', businessController.add);
app.post('/business/recommend', businessController.recommend);
app.get('/business/search', businessController.search);
app.post('/review/add', reviewController.add);
// ... other routes

// Error handling
app.use((req, res) => {
   res.status(404).send('404 - Page Not Found');
});

app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send('500 - Server Error');
});

// Start server
app.listen(port, () => {
   console.log(`Server running on port ${port}`);
});
