const Database = require('better-sqlite3');
const db = new Database('explorelocal.db');

//Checking if user logged in or not with a GET request
exports.getLoggedUser = (req,res,next) => {
    res.status(200).json(req.session.user);
}

// User login POST request in handled
exports.postLoginUser = (req,res,next) => {
    const {username,password} = req.body;
    try{
        const stmt = db.prepare('SELECT * FROM business_users WHERE username = ?');
        const result = stmt.get(username);
        if(!result){
            return res.status(404).json({message: "User Not Found"});
        }
        if (result.password === password) {
            req.session.user = result;
            return res.status(200).json({message: "Logged In", user: req.session.user});
        }
        return res.status(400).json({message: "Wrong Credentials"});
    }catch(e){
        return res.status(500).json({message : e});
    }
}

//Logout user GET request handled
exports.getLogoutUser = (req,res,next) => {
    req.session.destroy();
    res.status(200).json({message: "Logged Out"});
}