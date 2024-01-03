const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));


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
