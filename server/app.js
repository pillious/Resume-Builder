const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");
app.use(cors());

const { PORT } = require("./utils/constants");

// const connectDatabase = require("./utils/database");
// connectDatabase();

const indexRoutes = require("./routes/index");

app.use("/", indexRoutes);

//The 404 Route (ALWAYS Keep this as the last route)
app.get("*", function (req, res) {
  res.status(404).send("Error: 404. Page not found.\n");
});

app.listen(PORT, () => console.log(`API listening on port ${PORT}.`));
