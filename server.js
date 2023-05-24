const express = require("express");
let mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
let cors = require("cors");
const compression = require("compression");

let CONFIG = require("./server/app.config");

const appRoutes = require("./server/routes/app.routes");

const app = express();

app.use(compression());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json(), function (err, req, res, next) {
  if (err) {
    return res.status(500).json({ error: err });
  }
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "dist")));

// APIs location
app.use("/userDisplay", appRoutes);

// mongoose.connect(CONFIG.local['url'], { useNewUrlParser: true, useCreateIndex: true });
mongoose.connect(CONFIG.db["production"], {
  useNewUrlParser: true,
});
mongoose.connection.on("error", (err) => {
  console.log(`Connection Error on ${err}`);
  process.exit(-1);
});
mongoose.connection.on("connected", () => {
  console.log(`MongoDB connected on development mode`);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

const port = process.env.PORT || "4000";
app.set("port", port);

const server = http.createServer(app);

// server.listen(port, () => console.log(`Running on localhost:${port}`));
server.listen(port);

server.on("error", onError);
server.on("listening", onListening);

function onError() {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  let addr = server.address();
  console.log(`Address : ${addr}`);
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log(`listening on por %o in ${app.settings.env} settings env`, addr);
}
