const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  rollnum: String,
  picture: String,
  password: String,
  phone: String,
});

mongoose.model('students', StudentSchema);
