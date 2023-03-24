const fs = require("fs");
const path = require("path");

const targetFilePath = path.join(__dirname, "notes.txt");
const outputFilepath = path.join(__dirname, "notes-final.txt");
const rs = fs.createReadStream(targetFilePath);
const ws = fs.createWriteStream(outputFilepath);

rs.on("data", (chunkData) => {
  console.log(chunkData.toString());
  ws.write(chunkData);
});
// rs.on("end", () => {
//   console.log("File Reading completed");
// });

// rs.pipe(ws);
