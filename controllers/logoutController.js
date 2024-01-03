const logoutController = (req, res) => {
    // Destroy the user session
    req.session.destroy((err) => {
        if(err) {
            console.log(err);
            // Optionally handle the error, perhaps redirecting to an error page
            res.redirect('/error');
        } else {
            // Redirect to the home page (or login page) after successful logout
            res.redirect('/');
        }
    });
};

module.exports = logoutController;
