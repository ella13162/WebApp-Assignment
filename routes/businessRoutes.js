const express = require('express');
const businessController = require('../controllers/businessController');
const {loggedCheckMiddleware} = require('../middlewares/authenticator');

const routes = express.Router();

routes.get('/all',businessController.getAllBusiness);
routes.post('/add',loggedCheckMiddleware,businessController.postAddBusiness);
routes.post('/recommend/:business_id',businessController.postRecommendBusiness);
routes.post('/review',loggedCheckMiddleware,businessController.postReviewBusiness);

module.exports = routes;