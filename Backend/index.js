require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.port;
const path = require("./routes");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { connection } = require("./connector");
const cors = require("cors");
app.use(cors());
const paths = require('path')


connection();
app.use("/", path);


app.get('/',(req,res)=>{
    app.use(express.static(paths.resolve(__dirname,'./','build')));
    res.sendFile(path.resolve(__dirname,'./','build','index.html'))
})
app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
