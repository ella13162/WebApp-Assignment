module.exports = (req, res) => {
    res.render('loginForm', {
        invalidUserError: null,
        invalidPasswordError: null
    })
}