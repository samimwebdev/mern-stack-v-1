const http = require("http");
const fsPromise = require("fs").promises;
const path = require("path");
const { v4: uuidV4 } = require("uuid");

console.log(uuidV4());
console.log("Hello From NodeMon");
//server side rendered website (formatted content html? form the server)
//Raw Data sending from server(?Headless), api

const server = http.createServer(async (req, res) => {
  try {
    switch (req.url) {
      case "/":
        const homeFilePath = await fsPromise.readFile(
          path.join(__dirname, "pages", "index.html")
        );

        //res body, extra info - headers
        //status code
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(homeFilePath);
        break;
      case "/about":
        const aboutFilePath = await fsPromise.readFile(
          path.join(__dirname, "pages", "about.html")
        );
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(aboutFilePath);
        break;
      case "/profiles":
        const ProfileData = [
          {
            name: "samim",
            age: 30,
          },
          {
            name: "Karim",
            age: 25,
          },
          {
            name: "Adnan",
            age: 45,
          },
        ];
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify(ProfileData));
        break;
      default:
        const notFoundFilePath = await fsPromise.readFile(
          path.join(__dirname, "pages", "notFound.html")
        );
        res.setHeader("Content-Type", "text/html");
        res.writeHead(404);
        res.end(notFoundFilePath);
    }
  } catch (err) {
    console.log(err);
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`server is Running on port ${PORT}`);
});
