var mongoose=require('mongoose')
var Schema = mongoose.Schema;
const Review=require('../models/review');

var RestaurantSchema=mongoose.Schema({
    restaurantName:{
        type: String,
        required:true
    },    
    
    location:{
       type:{type:String},
       coordinates:[Number], 
    },
    reviews:[{    
        type: Schema.Types.ObjectId, 
        ref: 'Review'
    }]
});
RestaurantSchema.index({"location":"2dsphere"});
const Restaurant=module.exports=mongoose.model('Restaurant',RestaurantSchema);
