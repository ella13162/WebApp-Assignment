const Database = require('better-sqlite3');
const db = new Database('explorelocal.db');

//Handling searching all business GET request
exports.getAllBusiness = (req,res,next) => {
    let region = req.query.region.trim();
    if(region.length === 0){
        return res.status(400).json({message: "Please, Enter a valid region name."});
    }
    try{
        const stmt = db.prepare('SELECT * from localbusiness WHERE region LIKE ?');
        const regions = stmt.all(region);
        res.status(200).json(regions);
    } catch (e){
        res.status(500).json({message : e});
    }
}

//Handling add business POST request
exports.postAddBusiness = (req,res,next) => {
    const {name,type,country,region,lon,lat,description,recommendations} = req.body;
    if(!(name.trim() && type.trim() && country.trim() && region.trim() && description.trim())){
        return res.status(400).json({message: "Please, Fill up all the fields."});
    }
    try{
        const stmt = db.prepare('INSERT INTO localbusiness (name,type,country,region,lon,lat,description,recommendations) VALUES (?,?,?,?,?,?,?,?)');
        const result = stmt.run(name,type,country,region,lon,lat,description,recommendations);
        res.status(201).json({message: 'Business added to the Database.'});
    } catch (e){
        res.status(500).json({message : e});
    }
    
}

//Handling recommend business POST request
exports.postRecommendBusiness = (req,res,next) => {
    const Id = req.params.business_id;
    try{
        const stmt = db.prepare('UPDATE localbusiness SET recommendations = (recommendations+1) WHERE id = ?');
        const result = stmt.run(Id);
        res.status(200).json({message: 'Business Recommended. Reload the page and search again.'});
    } catch (e){
        res.status(500).json({message : e});
    }
}

//Handling review business POST request
exports.postReviewBusiness = (req,res,next) => {
    const {business_id,review} = req.body;
    if(!(review.trim())){
        return res.status(400).json({message: "Please, Add something in Review."});
    }
    try{
        const stmt1 = db.prepare('SELECT * FROM localbusiness WHERE id = ?');
        const res = stmt1.run(business_id);
        if(res==null || res==undefined || res.length === 0){
            res.status(404).json({message: "Business Not Found"});
        } else {
            try{
                const stmt2 = db.prepare('INSERT INTO business_reviews (business_id,review,user_id) VALUES (?,?,?)');
                const result = stmt2.run(business_id,review,req.session.user.id);
                res.status(201).json({message:"Review Added"});
            } catch(e){
                return res.status(500).json({message : e});
            }
        }
    } catch (e) {
        return res.status(500).json({message : e});
    }
}