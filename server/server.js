require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(process.env.MONGO_URI);

async function connectDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Could not connect to MongoDB");
        console.error(error);
    }
}

connectDatabase();

app.get("/", (req, res) => {
    res.json({
        message: "Server is running"
    });
});

// POST route for Signup
app.post("/signup", async (req, res) => {
    const { f_name, l_name, username, password } = req.body;

    // 1. Verify required fields
    if (!f_name || !l_name || !username || !password) {
        return res.status(400).json({ message: "Required information is missing" });
    }

    try {
        // 2. Access the database (we will name it "pa2") and the "users" collection
        const db = client.db("pa2");
        const users = db.collection("users");

        // 3. Check if the username already exists
        const existingUser = await users.findOne({ username: username });

        if (existingUser !== null) {
            // 409 status code means "Conflict" - the username is taken
            return res.status(409).json({ message: "Username already exists" });
        }

        // 4. Create the new user document matching the assignment requirements
        const newUser = {
            f_name: f_name,
            l_name: l_name,
            username: username,
            password: password
        };

        await users.insertOne(newUser);

        // 201 status code means "Created"
        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        console.error(error);
        // 500 status code means a database or server error occurred
        res.status(500).json({ message: "Server error" });
    }
});

app.listen(9000, () => {
    console.log("Server running on port 9000");
});