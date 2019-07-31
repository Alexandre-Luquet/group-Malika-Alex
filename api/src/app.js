const express = require("express");
const api = express();

api.listen(8080);

const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  autoIncrement = require("mongoose-auto-increment");

let bodyParser = require("body-parser");
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

const urlmongo = "mongodb://localhost:27017/groupGenerator";

let connection = mongoose.createConnection(urlmongo, { useNewUrlParser: true });

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var db = mongoose.connection;

autoIncrement.initialize(connection);

db.on("error", console.error.bind(console, "Erreur lors de la connexion"));

db.once("open", () => {
  console.log("Connexion à la base OK");
});

let userSchema = new Schema(
  {
    _id: { type: Number },
    name: String
  },
  {
    versionKey: false // Retire le v dans mongoDB
  }
);

userSchema.plugin(autoIncrement.plugin, "users");
let user = mongoose.model("users", userSchema);

api.post("/addUser", (req, res) => {
  let newUser = new user();
  newUser.name = req.body.name;
  console.log(req.body.name);

  newUser.save(err => {
    if (err) {
      res.send(err);
    }
    res.send("cooool");
  });
});

api.post("/addGroup", (req, res) => {
  let binome = 2;
  console.log(binome);
  res.send("yeeeah");
});
