const express = require("express");
const api = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
// les constances à déclarer ( les modules qu'on installe pour utiliser dans l'API)
const urlmongo = "mongodb://localhost:27017/groupGenerator";

api.listen(8080);

api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());
api.use(cors());

// on commence la connexion avec la base de données 
let connection = mongoose.connect(urlmongo, { useNewUrlParser: true });

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var db = mongoose.connection;


db.on("error", console.error.bind(console, "Erreur lors de la connexion"));

db.once("open", () => {
  console.log("Connexion à la base OK");
});

let userSchema = mongoose.Schema(
  {   
    firstname: String,
    lastname: String,    
  },
  {
    versionKey: false // Retire le _v dans mongoDB
  }
);


let user = mongoose.model("users", userSchema);
// Pour ajouter un utilisateur à la base de données
api.post("/addUser", (req, res) => {
  let newUser = new user();
  newUser.firstname = req.body.userData.firstname; // correspond au champ qu'on rentre dans postman 
  newUser.lastname = req.body.userData.lastname;
 
  console.log(newUser);

newUser.save(err => {
    if (err) {
      res.send(err);
    }
    res.send("cooool");
  });
});







let userList = [];

api.get("/getUsers", (req,res)=> {
    user.find({},(err, users) => {
      if (err) {
        res.send("Pas possible d'afficher les utilisateurs");
        res.end();
      }
      res.json(users);    
      }); 
});
    
      // userList.push(users)
      // res.json(users);
      // // userList = users.push.firstname;
      // // userList.push(users);

      // // userList.push(users);
      // res.end();
   



api.get("/addGroup", (req, res) => {
  
  user.find({}, (err, users) => {
    if (err) {
      res.send("Pas possible d'afficher les utilisateurs");
      res.end();
    }
    if (users) {
      for (let i = 0; i < users.length; i++) {

        userList.push({ firstname: users[i].firstname, lastname: users[i].lastname });
        // console.log(userList);
      }}
      let groupList = [];
       while (userList.length > 1) {
         let tab = [];
         let r1 = Math.floor(Math.random() * userList.length);
         let person1 = userList.splice(r1, 1);

         let r2 = Math.floor(Math.random() * userList.length);

         let person2 = userList.splice(r2, 1);

         tab.push(person1[0], person2[0]);
         groupList.push(tab);
       

       }
       if (userList.length === 1) {
         groupList.push(userList.splice(0, 1));
       }
      

       console.log(groupList);
       res.send(groupList);
    });  
    
});

 // res.send(userList);

 // let binome = Math.round(Math.random() * 5) + 1;
 // console.log(binome);
 // res.send("yeeeah");
