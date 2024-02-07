const express = require('express');
const userController = require('../controllers/userController');
const {loggedCheckMiddleware} = require('../middlewares/authenticator');

const routes = express.Router();

routes.post('/login',userController.postLoginUser);
routes.get('/loggeduser',loggedCheckMiddleware,userController.getLoggedUser);
routes.get('/logout',loggedCheckMiddleware,userController.getLogoutUser);
            
module.exports = routes;