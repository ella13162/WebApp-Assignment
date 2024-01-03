# Creating Controllers:

It allows to minimize the text in server and with a good set up of the folders easy access to them in emergency to edit them.

example of Controller:

```js
const homeController = (req, res) => {
    res.render('index');
};

module.exports = homeController;
```

server has to read the controller, this is why export module was necessary so in server we could import that module:

```js
const homeController = require('./controllers/homeController');
const blogController = require('./controllers/blogController');

```

and later update the routes:

```js
// Set the routes
app.get('/', homeController);
app.get('/blog', blogController);
app.get('/error', error);
app.get('/explore', exploreController);
app.get('/howitworks', howitworksController);
app.get('/login', loginForm);
app.get('/register', registerForm);
app.get('/reviews', reviewsController);
app.get('/subscribe', subscribeController);

```