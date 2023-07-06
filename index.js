const express = require("express");
const { connection } = require("./db");
const cors = require("cors")
const { bookRouter } = require("./routes/book.route");


const app = express();

app.use(cors())

app.get("/", (req, res)=>{
    res.send("hello")
})

app.use(express.json());
app.use("/book", bookRouter)


app.listen(7200, ()=>{
    try {
        connection
        console.log("connection built at 7200");
    } catch (error) {
        console.log(error)
    }
})