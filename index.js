var express=require('express');
var bodyparser=require('body-parser');
var mongoose=require('mongoose');
var cors=require('cors');
var path=require('path');
var app=express();
// const MongoClient=require('mongodb').MongoClient;
// const assert=require('assert');
// const url='mongodb://localhost:27017';
// const dbName="restaurants";
const route=require('./routes/route');

app.use(cors());
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use('/',route);
//connect to mongodb
mongoose.connect('mongodb://localhost:27017/wander');
mongoose.connection.on('connected',()=>{
    console.log("connected to mongodb @27017");
})

mongoose.connection.on('error',(err)=>{
    console.log("error occured"+err);
})

const port=3000;

app.get('/',(req,res)=>{
    res.send("Dishaaa");
})

app.listen(port,()=>{
    console.log('server started at port :'+port);
})