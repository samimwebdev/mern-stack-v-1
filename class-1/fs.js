//core module
//fs -file system
//read
const fs = require("fs").promises;
const path = require("path");

const targetFilePath = path.join(__dirname, "greetings.txt");
const finalFilePath = path.join(__dirname, "greet.txt");

async function fileOperations() {
  try {
    const data = await fs.readFile(targetFilePath, "utf-8");
    console.log("Read complete", data);
    await fs.appendFile(targetFilePath, "\nThanks for writing Node.js");
    console.log("Append complete");
    await fs.rename(targetFilePath, finalFilePath);
    console.log("File Rename complete");
  } catch (err) {
    console.log(err);
  }
}

fileOperations();

//Reading file
// fs.readFile(targetFilePath, "utf-8", (err, data) => {
//   if (err) {
//     throw new Error(err);
//   }
//   //update file -append
//   fs.appendFile(targetFilePath, "\nThanks for writing Node.js", (err) => {
//     if (err) throw new Error(err);
//     fs.rename(targetFilePath, finalFilePath, (err) => {
//       if (err) throw new Error(err);
//       console.log("File Rename completed ");
//     });

//     console.log("update completed ");
//   });
//   console.log("Reading Data", data);
// });

//writing file
// fs.writeFile(targetFilePath, "Hello From Node.js!", (err) => {
//   if (err) throw new Error(err);
//   console.log("Writing completed ");
// });

// //update file -append
// fs.appendFile(targetFilePath, "\nThanks for writing Node.js", (err) => {
//   if (err) throw new Error(err);
//   console.log("update completed ");
// });

//delete file
// fs.unlink(targetFilePath, (err) => {
//   if (err) throw new Error(err);
//   console.log("Delete completed ");
// });

//rename file
// fs.rename(targetFilePath, finalFilePath, (err) => {
//   if (err) throw new Error(err);
//   console.log("File Rename completed ");
// });

process.on("uncaughtException", (err) => {
  console.log(err.message);
  process.exit(1);
});

//create
//write
//update
//delete
