// import express and database from better - sqlite3
const express = require('express');
const Database = require('better-sqlite3');
const app = express();

// set up body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
//configuration settings
const PORT = 3000;
const DB = 'explorelocal.db' // path to sqlite db file

// DB connection
const db = new Database(DB);
console.log (`Connected to the ${DB} database`);

//routess / end points

// ----- PART A-------

// lookup for all the local business
app.get('/localbusiness', (req, res) =>{
    try {
        const stmt = db.prepare("SELECT * FROM localbusiness");
        const result = stmt.all();
        console.log(`Local Business: ${result.length} rows found.`);
        res.status(200).json(result); // Send response back
    } catch (error) {
        res.status(500).json({error: error.message}); // Send error message
    }
});

// Task 1: Look up all local business in given region. It should return results in JSON file.
app.get('/localbusiness/:region', (req, res) => {
    try {
        const region = req.params.region.toLowerCase(); // retrieve the region parameter from the request URL and convert it to lowercase
        const stmt = db.prepare("SELECT * FROM localbusiness WHERE LOWER(region) = ?");
        const result = stmt.all(region);
        console.log(`Local Business in ${region}: ${result.length} rows found.`);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Task 2: Add a new business. This API endpoint should simply read in the business details as POST data, and add them to the database.
app.post('/localbusiness/add', (req, res) => {
    try {
        const { name, type, country, region, lon, lat, description, recommendations } = req.body;
        const stmt = db.prepare("INSERT INTO localbusiness (name, type, country, region, lon, lat, description, recommendations) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        const result = stmt.run(name, type, country, region, lon, lat, description, recommendations);
        res.json({ id: result.lastInsertRowid });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(`POST add business error: ${error}`);
    }
});

// check new added business looking by name
app.get('/localbusiness/:name', (req, res) => {
    try {
        const name = `%${req.params.name.toLowerCase()}%`; // allow partial matches - like wild card in sql
        const stmt = db.prepare("SELECT * FROM localbusiness WHERE LOWER(name) LIKE ?");
        const result = stmt.all(name);
        console.log(`Search for ${req.params.name}: ${result.length} rows found.`);
        res.status(200).json(result);
    } catch (error) {
        console.error(`Error searching for business by name: ${error}`);
        res.status(500).json({ error: error.message });
    }
});

// Task 3: Recommend a local business. This API endpoint should read in the business ID and increase the number of recommendations by one for that local business.
app.post('/localbusiness/recommend/:id', (req, res) => {
    try {
        const businessId = req.params.id;
        const stmt = db.prepare("UPDATE localbusiness SET recommendations = recommendations + 1 WHERE id = ?");
        const result = stmt.run(businessId);

        if (result.changes === 1) {
            res.status(200).json({ message: "Recommendation added successfully!" });
        } else {
            res.status(404).json({ message: "Business not found." });
        }
    } catch (error) {
        console.error(`Error recommending business: ${error}`);
        res.status(500).json({ error: error.message });
    }
});

// DELETE business
app.delete('/localbusiness/:id', (req, res) => {
    try {
        const businessId = req.params.id;
        const stmt = db.prepare("DELETE FROM localbusiness WHERE id = ?");
        const result = stmt.run(businessId);
        
        if (result.changes === 1) {
            res.status(200).json({ message: "Business deleted successfully." });
        } else {
            res.status(404).json({ message: "Business not found." });
        }
    } catch (error) {
        console.error(`Error deleting business: ${error}`);
        res.status(500).json({ error: error.message });
    }
});


app.get('/', (req, res) =>{
    res.send('hello!')
});

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}/`));