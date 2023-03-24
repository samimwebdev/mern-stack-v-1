//Events

//interaction, click, blur, submit
//Raise - listen
//client-server-response

const events = require("events");
const eventEmitter = new events.EventEmitter();

//listener
eventEmitter.on("greet", (name, profession) => {
  console.log(
    "Listening of event Greet",
    `Hello ${name}, you are a ${profession}`
  );
});

//raise
eventEmitter.emit("greet", "samim", "Programmer");
