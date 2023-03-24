//core module
const path = require("path");
// const parsedPath = path.parse(__filename);
// console.log(parsedPath.base);
// console.log(parsedPath.dir);
// console.log(parsedPath.name);
// console.log(parsedPath.ext);

// console.log(path.parse(__dirname));
// console.log(
//   path.format({
//     root: "C:\\",
//     dir: "C:\\Users\\samim\\Desktop\\MERN Stack",
//     base: "class-1",
//     ext: "",
//     name: "class-1",
//   })
// );

//normalizePath
// const targetPath = "C:\\Users\\samim//Desktop\\MERN Stack\\class-1\\notes.txt";
// console.log(path.normalize(targetPath));

//join
console.log(path.join(__dirname, "notes.txt"));
