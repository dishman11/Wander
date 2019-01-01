const express=require('express');
const router=express.Router();

const Review=require('../models/review');
const Restaurant=require('../models/restaurant');

//Routes for restaurants
router.get('/near/:longitude/:latitude',(req,res,next)=>{
   Restaurant.find({ location:
        { $geoWithin:
           { $centerSphere: [ [req.params.longitude,req.params.latitude ], 5 / 3963.2 ] } } },(err,results)=>{
               res.json(results);
           }).limit(50);
})

router.get('/restaurants',(req,res,next)=>{
    Restaurant.find((err,restaurants)=>{
        res.json(restaurants);
    });
});
router.get('/restaurant/:id',(req,res,next)=>{
    Restaurant.findById({_id:req.params.id},(err,restaurant)=>{
        res.json(restaurant);
    })
});
router.post('/restaurant',(req,res,next)=>{
    let newRestaurant=new Restaurant({
        restaurantName:req.body.restaurantName,
        location:req.body.location,
        reviews:[]
    })
    newRestaurant.save((err,restaurant)=>{
        if(err){
            res.json({msg:"failed to add contact"});
        }
        else{
            res.json({msg:"Restaurant added successfully"})
        }
    })
})
router.delete('/restaurant/:id',(req,res,nex)=>{
    Restaurant.remove({_id:req.params.id},(err,result)=>{
        if(err)
        {
            res.json(err);
        }
        else{

            res.json(result);
        }
    })
});

//Routes for reviews
router.get('/reviews',(req,res,next)=>{
    Review.find(function(err,reviews){
        res.json(reviews);
    })   
});
router.get('/review/:id',(req,res,next)=>{
    Review.find({restaurant_id:req.params.id},(err,review)=>{
        if(err){
            console.log(err+"cannot find reviews of restaurant")
        }
        else{ 
           res.json(review);
        }
   })
});
router.post('/review/:id',(req,res,next)=>{
    let newReview=new Review({
                    restaurant_id:req.params.id,
                    title:req.body.title,
                    description:req.body.description,
                    rating:req.body.rating
                 });
    newReview.save((err,review)=>{
        if(err)
        {
            res.json(err);
        }
        else
        {     
            Restaurant.findOneAndUpdate(
                req.params.id,
                {$push:{"reviews":newReview._id}},
                function(err,models){
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        res.json(models);
                    }
                })
        }
    })    
});


router.delete('/review/:id',(req,res,nex)=>{
    Review.remove({_id:req.params.id},(err,result)=>{
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(result);
        }
    })
});
module.exports=router;