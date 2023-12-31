const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    title: {type:String, required:true},
    author: {type:String, required:true},
    genre: {type:String, required:true},
    description: {type:String, required:true},
    price: {type:String, required:true},
})

const BookModel = mongoose.model("book", bookSchema);

module.exports = {BookModel}