
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var master = {};



var accountSchema = new Schema({
    username: String,
    password: String,
    level: String,
    name: String,

});

var facultyDetailsSchema = new Schema({
    psrn: String,
    name: String,
    sex: String,
    dob: String,
    dependentFather: String,
    dobFather: String,
    dependentMother: String,
    dobMother: String,
    dependentSpouse: String,
    dobSpouse: String,
    dependentChild1: String,
    dobChild1: String,
    dependentChild2: String,
    dobChild2: String,
    contact: String
})

var studentDetailsSchema = new Schema({
    barcode: String,
    id: String,
    name: String,
    sex: String,
    dob: String,
    contact: String
})
var studentHostelsSchema = new Schema({
    barcode: String,
    id: String,
    name: String,
    room: String
})

var prescriptionSchema = new Schema({
    id: String,
    date: String,
    time: String,
    reg: String,
    name: String,
    sex: String,
    type: String,
    doctor: String,
    comments: String,
    age: Number,
    dob: String,
    contact: String,
    room: String
})

var doctorSchema = new Schema({
    name: String
})


master.accountSchema = accountSchema;
master.facultyDetailsSchema = facultyDetailsSchema;
master.studentDetailsSchema = studentDetailsSchema;
master.studentHostelsSchema = studentHostelsSchema;
master.prescriptionSchema = prescriptionSchema;
master.doctorSchema = doctorSchema;
module.exports = master;