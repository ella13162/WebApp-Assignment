exports.loggedCheckMiddleware = (req, res, next) => {
    if (req.session.user == null || req.session.user==undefined) {
        return res.status(401).json({message: "You must Login"});
    }
    next();
}