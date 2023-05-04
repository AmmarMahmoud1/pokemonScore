require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const Game = require ("./models/game")
const port = 5100 || process.env.PORT;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());


const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
});
app.get('/' , (req, res) =>
{res.send('welcome to pokemon DB')});
app.post('/game/save' , (req, res) =>{
    const form = req.body;
    Game.create({player1_name : form.player1_name , player2_name : form.player2_name ,player1_hp :req.player1_hp,player2_hp :req.player2_hp,   })
    .then(() => { res.status(201).send('Game has been saved');
})
.catch((err) => {
    res.status(400).send(err);
  });
});

app.get('/game/leaderboard' , (req,res) =>{
    Game
   .find({})
   .then((models) => {
    res.send(models);
  })
  .catch((err) => {
    res.send(err);
  })
});

//getLastInsertedDocument.find({}).sort({_id:-1}).limit(1);
app.get('.')



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });