
var express = require("express")
var router  = express.Router({mergeParams:true})

var Campground = require("../models/campground")
var Comment = require("../models/comment")

var middleware  = require("../middleware")



router.get("/new", middleware.isLoggedIn, function(req, res){
Campground.findById(req.params.id, function(err, campground){
    if(err){
        console.log(err)
    }else{
    res.render("comments/new", {campground: campground})
    }
})
})


router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground) {
        if(err){
            console.log(err)
        }else{
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err)
               }else{
                   comment.author.id= req.user._id
                   comment.author.username =req.user.username
                   comment.save()
                   campground.comments.push(comment)
                   campground.save()
                   res.redirect("/campgrounds/"+req.params.id)
               }
           })
        }
    })
})

router.get("/:c_id/edit",middleware.checkCommentOwnership, function(req, res){

    Comment.findById(req.params.c_id, function(err, comment) {
        if(err){
            return res.redirect("back")
        }
        res.render("comments/edit", {campground_id:req.params.id, comment:comment})
})
    })
    
router.put("/:c_id",middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.c_id,req.body.comment, function(err, comment){
     if(err){
         return res.redirect("back")
     } else{
         res.redirect("/campgrounds/"+req.params.id)
     }
    })
})

router.delete("/:c_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.c_id, function(err){
        if(err){
            res.redirect("back")
        }else{
            res.redirect("/campgrounds/"+req.params.id)
        }
    })
})



module.exports= router