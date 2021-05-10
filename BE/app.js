const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const routes = require("./routes/indexRoutes");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/", routes);

server.listen(8000, (req, res, next) => {
  console.log("Server running on port 8000");
});

const io = require("./socket").init(server);

io.on("connection", (socket) => {
  console.log("client connected: ");
});
