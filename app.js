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
{res.send('welcome to pokemon DB 121')});



app.post('/game/save' , (req, res) =>{
    const form = req.body;
    
  if (form.hp1 > form.hp2) {
    Game.create({player1_name : form.player1_name , player2_name : form.player2_name ,hp1 :Number(form.hp1),hp2 :Number(form.hp2), score1: Number(form.score1), score2:Number(form.score2), winner :"player 1 win the game"   })
    .then((newGame) => { res.status(201).send(newGame);
}).catch((err) => {
    res.status(400).send(err);
  });
  }

  else  if (form.hp2 > form.hp1) {
    Game.create({player1_name : form.player1_name , player2_name : form.player2_name ,hp1 :Number(form.hp1),hp2 :Number(form.hp2), score1: Number(form.score1), score2:Number(form.score2), winner :"player  2win the game"   })
    .then((newGame) => { res.status(201).send(newGame);
}).catch((err) => {
    res.status(400).send(err);
  });
  }

  else  if (form.hp1 == form.hp2) {
    Game.create({player1_name : form.player1_name , player2_name : form.player2_name ,hp1 :Number(form.hp1),hp2 :Number(form.hp2), score1: Number(form.score1), score2:Number(form.score2), winner:"The result is equivalent between player 1 and player 2"   })
    .then((newGame) => { res.status(201).send(newGame);
}).catch((err) => {
    res.status(400).send(err);
  });
  }
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