const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path')



const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/express', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  address: String,
  website: String,
  isActive: Boolean
});

const User = mongoose.model('User', userSchema);
app.set("views", path.join(__dirname, "views"));


app.engine("hbs", hbs.engine({ extname: ".hbs"}));
app.set('view engine', "hbs");

// tabela//
app.get('/', async (req, res) => {
  try {
     User.find().then((users) =>  {
      res.render('users/users', { users: users });
     })
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Błąd serwera');
  }
});

app.listen(port, () => {
  console.log(`Aplikacja działa na http://localhost:${port}`);
});
