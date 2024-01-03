const users= require('../models/users')

module.exports = async (req, res) => {
  
   await users.create({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        usertype: req.body.usertype
    })

    res.redirect('/')
}