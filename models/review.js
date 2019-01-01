const mongoose=require('mongoose');
var Schema = mongoose.Schema;
const Restaurant=require('../models/restaurant');

const ReviewSchema=mongoose.Schema({
    restaurant_id:{
        type: String,
        required:true
    },
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    rating:{
        type:String,
        required:true
    }
});
const Review=module.exports=mongoose.model('Review',ReviewSchema);
