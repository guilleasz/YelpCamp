var mongoose=require("mongoose")
var Campground=require("./models/campground")
var Comment = require("./models/comment")

var data= [
        {
        name: "Clouds Rust",
        image:"https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg",
        description:"blah blah blah blah"
    },
    {
        name: "Desert Mesa",
        image:"https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg",
        description:"blah blah blah blah"
    },    
    {
        name: "Cave Elane",
        image:"https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg",
        description:"blah blah blah blah"
    }
]
module.exports=function seedDB(){
    Campground.remove({}, function(err){
       /* if(err){
            console.log(err)
        }else{
            console.log("all campgrounds remove")
             data.forEach(function(seed){
             Campground.create(seed, function(err,campground){
                if(err){
                    console.log(err)
                }else{
                    console.log("Added a Campground")
                    Comment.create({
                        text:"This Place is great but I wish there was internet",
                        author:"Homer"
                    }, function(err, comment){
                        if(err){
                            console.log(err)
                        }else{
                        campground.comments.push(comment)
                        campground.save()
                        console.log("created new comment")
                        }
                    })
                }
                  
              })
            })
        }*/
    })
   
}