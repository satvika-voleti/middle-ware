const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.static("public"));

// Middleware
app.use(express.json());

// Custom Middleware
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/NotifyDB")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Schema
const notificationSchema = new mongoose.Schema({
    title: String,
    message: String
});

// Model
const Notification = mongoose.model("Notification", notificationSchema);

// POST
app.post("/notifications", async (req, res) => {
    const data = await Notification.create(req.body);
    res.json(data);
});

// GET
app.get("/notifications", async (req, res) => {
    const data = await Notification.find();
    res.json(data);
});

// DELETE
app.delete("/notifications/:id", async (req, res) => {
    await Notification.findByIdAndDelete(req.params.id);
    res.send("Notification deleted");
});

// Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});