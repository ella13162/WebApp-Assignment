const errorController = {
    notFound: (req, res) => {
        res.status(404).render('error', { errorMessage: '404 - Page Not Found' });
    },
    serverError: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).render('error', { errorMessage: '500 - Internal Server Error' });
    }
}

module.exports = errorController;
