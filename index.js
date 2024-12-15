import express from 'express';
import { MongoClient } from 'mongodb';
import generateQuery from './queryGenerator.js';

const app = express();
const port = 3000;

// MongoDB Connection URL and Database Name
const uri = 'mongodb://localhost:27017';
const dbName = 'test';

let db;

// Connect to MongoDB
MongoClient.connect(uri)
    .then((client) => {
        console.log('Connected to MongoDB');
        db = client.db(dbName);

        // Start the Express server after successful DB connection
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    })
    .catch((err) => console.error('Failed to connect to MongoDB', err));

// Example API Endpoint
app.get('/students', async (req, res) => {
    try {
        const collection = db.collection('students');
        console.log('query',req.query.ql)
        const q = generateQuery(req.query.ql);
        console.log(q)
        const data = await collection.find(q).toArray();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});
