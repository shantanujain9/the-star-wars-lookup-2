import express from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
const PORT = 3000;


// Endpoint to read and send JSON file content
app.get('/api/planets', async (req, res) => {
   const testObject = {
    name: 'Earth',
    type: 'planet'

   };
   res.json(testObject);
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});