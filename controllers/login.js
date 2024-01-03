const user = require('../models/users')
const bcrypt = require('bcrypt')

module.exports = (req, res) => {
    // const username = req.body.username;
   // const password = req.body.password;

    const {username, password} = req.body;
   // console.log(username)
   // console.log(password)

   user.findOne({username: username}).then(function(person){
     console.log(person)
    if(person){
        // decript the password and compare it with the received login information/password from the login form
        bcrypt.compare(password, person.password, (error, same) => {
            if(same){
                // This means that the user is successfully logged In
                // req.session.regenerate(function (err) {
                //     if (err) next(err)
                
                //     // store user information in session, typically a user id
                //     req.session.userId = person._id;
                //     req.session.userType = person.usertype;
                //     console.log(req.session)
                
                //     // save the session before redirection to ensure page
                //     // load does not happen before session is saved
                //     req.session.save(function (err) {
                //       if (err) return next(err)
                //       res.redirect('/')
                //     })
                //   })
                req.session.userId = person._id;
                req.session.userType = person.usertype;
                //console.log("This is my sessionId")
                // console.log(req.session.userId)
                // console.log(req.session.userType)
                res.redirect('/')
            } else {
                res.render('loginForm', {
                    invalidUserError: null,
                    invalidPasswordError: "Wrong Password"
                })
            }
        })
    }
    else {
        console.log('invalide user')
        res.render('loginForm', {
            invalidUserError: "Invalid User",
            invalidPasswordError: null
        })
    }
   })
}