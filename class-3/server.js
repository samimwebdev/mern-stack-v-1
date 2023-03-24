const express = require("express");
const path = require("path");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./middlewares/logger");

const app = express();
const PORT = process.env.PORT || 3000;

//CORS(cross origin resource sharing) communication and exchanging data
app.use(cors());
//serve static file
app.use("/", express.static(path.join(__dirname, "public")));

//Parse JSON
app.use(express.json());

//handling Form Data
app.use(express.urlencoded({ extended: false }));

//Routing in express
// /, /index /index.html
// app.get("^/$|/index(.html)?", (req, res) => {
//   //res.send("Hello From Node");
//   res.sendFile(path.join(__dirname, "views", "index.html"));
// });

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "index.html"));
// });

// app.get("/index.html", (req, res) => {
//   res.redirect(301, "/");
// });

// app.get("/", (req, res) => {
//   res.status(201).json({
//     greet: "Hi",
//   });
// });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

//route handler function
const one = (req, res, next) => {
  console.log("One");
  next();
};
const two = (req, res, next) => {
  console.log("Two");
  next();
};

const three = (req, res, next) => {
  throw new Error("We have raised an error!");
  res.json({
    done: true,
  });
};

app.get("/route-handler", three);

app.use(errorHandler);

//Not Found
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "404.html"));
// });
app.listen(PORT, () => {
  console.log(`Express JS is Running on port ${PORT}`);
});
