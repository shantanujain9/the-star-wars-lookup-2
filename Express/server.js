import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;

const app = express();
app.use(cors());
const PORT = 3000;

async function databases(
  collection1,
  collection2,
  params_id,
  id1,
  id2
) {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collectionA = db.collection(collection1);

  const query = {};
  query[id1] = Number(params_id);

  const cursor = await collectionA.find(query);
  const collectionB = db.collection(collection2);
  const films = [];
  while (await cursor.hasNext()) {
    const obj = await cursor.next();
    const id = obj[id2];
    const charCursor = await collectionB.find({ id: id });
    if (await charCursor.hasNext()) {
      const film = await charCursor.next();
      films.push(film);
    }
  }
  return films;
}


app.get("/api/planets", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("planets");
    const planets = await collection.find({}).toArray();
    res.json(planets);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("There was an error please try again.");
  }
});

app.get("/api/characters", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("characters");
    const characters = await collection.find({}).toArray();
    res.json(characters);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("There was an error please try again.");
  }
});

app.get("/api/films", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("films");
    const films = await collection.find({}).toArray();
    res.json(films);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("There was an error please try again.");
  }
});
//here
app.get("/api/planets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("planets");
    const planetsid = await collection.find({ id: parseInt(id) }).toArray();
    res.json(planetsid);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("There was an error please try again.");
  }
});

app.get("/api/characters/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("characters");
    const charactersid = await collection.find({ id: parseInt(id) }).toArray();
    res.json(charactersid);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("There was an error please try again.");
  }
});

app.get("/api/films/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("films");
    const films = await collection.find({ id: parseInt(id) }).toArray();
    res.json(films[0]);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("There was an error please try again.");
  }
});

app.get("/api/films/:id/characters", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await databases(
      "films_characters",
      "characters",
      id,
      "film_id",
      "character_id"
    );

    res.json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("There was an error please try again.");
  }
});

app.get("/api/films/:id/planets", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await databases(
      "films_planets",
      "planets",
      id,
      "planet_id",
      "planet_id"
    );

    res.json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("There was an error please try again.");
  }
});

app.get("/api/characters/:id/films", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await databases(
      "films_characters",
      "films",
      id,
      "character_id",
      "film_id"
    );
    res.json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("There was an error please try again.");
  }
});

app.get("/api/characters/:id/planets", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await databases(
      "characters",
      "planets",
      id,
      "id",
      "homeworld"
    );
    res.json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("There was an error please try again.");
  }
});

app.get("/api/planets/:id/films", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await databases(
      "films_planets",
      "films",
      id,
      "planet_id",
      "film_id"
    );
    res.json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("There was an error please try again.");
  }
});

app.get("/api/planets/:id/characters", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("characters");

    const result = await collection.find({ homeworld: Number(id) }).toArray();

    res.json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("There was an error please try again.");
  }
});
//till here
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});