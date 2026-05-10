const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/db");


dotenv.config();

connectDB();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Serve Frontend
app.use(express.static(path.join(__dirname, "../frontend")));


// Routes
app.use("/notes", require("./routes/noteRoutes"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});