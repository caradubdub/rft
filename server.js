const express = require("express");
const app = express();
const path = require("path");

const PORT = 8080;

app.use(express.static(path.join(__dirname, "./public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`running on port: ${PORT}`));
