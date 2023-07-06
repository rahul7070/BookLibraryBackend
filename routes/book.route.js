const express = require("express");
const { BookModel } = require("../model/book.model");
const bookRouter = express.Router();


bookRouter.post("/add", async (req, res)=>{
    try {
        let payload = new BookModel(req.body);
        await payload.save();
        res.json({msg:"added successfully"})
    } catch (error) {
        res.status(404).send({"msg":error.message})
    }
})

bookRouter.get("/", async (req, res)=>{
    try {
        let sortBy = req.query?.sortBy;
        let author = req.query?.author;
        let genre = req.query?.genre;

        let sortQuery = null;
        if(sortBy=="title") sortQuery={title:1}
        else if(sortBy=="author") sortQuery={author:1}
        if(sortBy=="price") sortQuery={price:1}

        let filterQuery = null;
        if(author) filterQuery={author:{$regex:author, $options:'i'}};
        if(genre) filterQuery={genre:{$regex:genre, $options:'i'}};

        let dataArr=null;
        if(sortQuery && filterQuery) dataArr=await BookModel.find(filterQuery).sort(sortQuery)
        else if(sortQuery) dataArr = await BookModel.find().sort(sortQuery);
        else if(filterQuery) dataArr =await BookModel.find(filterQuery);
        else  dataArr = await BookModel.find()
        // let dataArr = await BookModel.find()
        res.send({data:dataArr})
    } catch (error) {
        res.status(404).send({"msg":error.message})
    }
})

bookRouter.delete("/delete/:id", async (req, res)=>{
    try {
        let id = req.params.id
        await BookModel.findByIdAndDelete({_id:id});
        res.json({msg:"deleted successfully"})
    } catch (error) {
        res.status(404).send({"msg":error.message})
    }
})



module.exports = {bookRouter}