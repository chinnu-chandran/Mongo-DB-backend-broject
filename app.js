const express = require('express');

// const path = require('path');

const session = require('express-session')




const bodyParser = require('body-parser');


const mongoConnect = require('./util/database').mongoConnect;

const userRoutes = require('./routes/user');


const app = express();



app.use(session({
  secret : 'my secret',
  resave : false ,
  saveUninitialized : false
}))

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }))

// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/',userRoutes);





mongoConnect(() => {
  app.listen(3000);
});

