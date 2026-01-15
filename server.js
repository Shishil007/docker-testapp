const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 5050;
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGO_URL = "mongodb://127.0.0.1:27017";
const client = new MongoClient(MONGO_URL);

let db;

async function startServer() {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    db = client.db("apnacollege-db");

    app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
    });
}

startServer();

app.get("/getUsers", async (req, res) => {
    const users = await db.collection("users").find({}).toArray();
    res.json(users);
});

app.post("/addUser", async (req, res) => {
    const result = await db.collection("users").insertOne(req.body);
    res.json(result);
});
