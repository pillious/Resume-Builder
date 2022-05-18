const mongoose = require("mongoose");

const connectionStr = process.env.DATABASE_CONNECTION_STRING;

const connectDatabase = () => {
    mongoose.connect(connectionStr);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
        console.log("Connected successfully");
    });
};

module.exports = connectDatabase;
