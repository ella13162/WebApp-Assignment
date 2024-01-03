# SQL Web Aplication Development project: Explore local

## Step 1:

download the css template from > https://www.free-css.com/free-css-templates/page296/listrace

adjust index.html to ejs format and spread the code over few pages and in convenient folders:

|--assets --
|   |-css
|   |-fonts
|   |-images
|   |-img
|   |-js
|   |-logo
|
|--views --
|   |--layouts--
|   |   |-footer.ejs
|   |   |-header.ejs
|   |   |-navbar.ejs
|   |   |-scripts.ejs
|   |
|   |-blog.ejs
|   |-explore.ejs
|   |-howitworks.ejs
|   |-index.ejs
|   |-login.ejs
|   |-register.ejs
|
|-README.md

## Step 2:
creating a basic server.js to display all the shared code in the different web pages:


``````js
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
   res.render('index');
});

app.get('/blog', (req, res) => {
   res.render('blog');
});

app.get('/explore', (req, res) => {
   res.render('explore');
});

app.get('/howitworks', (req, res) => {
   res.render('howitworks');
});

app.get('/login', (req, res) => {
   res.render('login');
});

app.get('/register', (req, res) => {
   res.render('register');
});

app.get('/reviews', (req, res) => {
   res.render('reviews');
});

app.get('/subscribe', (req, res) => {
   res.render('subscribe');
});

app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}`);
});

```````