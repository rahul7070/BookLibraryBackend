const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb+srv://rahulraman:rahulraman@cluster0.nfeljpo.mongodb.net/bookdb?retryWrites=true&w=majority")


module.exports = {connection}