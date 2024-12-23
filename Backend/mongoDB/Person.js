const mongoose = require("mongoose");

const Person = new mongoose.Schema({
  
  name: {
    type: String,
   // required: true
  },
  phoneNumber: {
    type: String,
    //required: true
  },
  city: {
    type: String,
  },
});

const person = mongoose.model("People", Person);

module.exports = person;
