const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./Students');

app.use(bodyParser.json());

const Students = mongoose.model('students');
const mongouri =
  'mongodb+srv://seshaprasan3113:gundatii3113@cluster0-us3z3.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('connected to mongo ');
});
mongoose.connection.on('error', err => {
  console.log('error', err);
});

app.get('/', (req, res) => {
  res.send('welcome');
});

app.get('/view', (req, res) => {
  Students.findOne({rollnum: req.body.rollnum}, {}).then(data =>
    console.log(data),
  );
  res.send(this.data);
  console.log('retrieving');
  res.send(this.data);
});

app.get('/view-all', (req, res) => {
  Students.find({}).then(data => console.log(data));
  res.send(this.data);
  console.log('retrieving all');
  res.send(this.data);
});

app.post('/send-data', (req, res) => {
  const student = new Students({
    name: req.body.name,
    email: req.body.email,
    rollnum: req.body.rollnum,
    picture: req.body.picture,
    salary: req.body.salary,
    password: req.body.password,
    phone: req.body.phone,
  });
  student.save().then(data => console.log(data));
  res.send(this.data);
});

app.post('/delete', (req, res) => {
  const {_id} = req.body;
  console.log('received at app', _id);
  Students.findOneAndRemove({_id}).then(data => {
    console.log(data);
    res.send(data);
  });
});

app.post('/update', (req, res) => {
  const _id = req.body._id;
  const name = req.body.name;
  console.log('at update received', _id);
  console.log('at update received', name);
  Students.findByIdAndUpdate(_id, {
    $set: {
      name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      rollnum: req.body.rollnum,
    },
  }).then(data => {
    console.log(data);
    res.send(data);
  });
});

app.listen(3000, () => {
  console.log('server running');
});

app.post('/singin', (req, res) => {
  const {rollnum, password} = req.body;
  if (!rollnum || !password) {
    res.status(422).json('0');
    // res.send('0');
  } else {
    Students.findOne({rollnum: rollnum}).then(savedUser => {
      if (savedUser) {
        if (password === savedUser.password) {
          console.log('match');
          res.send(savedUser);
        } else {
          console.log('not matched');
          res.send('0');
        }
      } else {
        res.status(422).json('0');
      }
    });
  }
});
