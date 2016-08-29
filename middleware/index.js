var middlewareObj   = {}

var Campground  = require("../models/campground"),
    Comment     = require("../models/comment")


middlewareObj.isLoggedIn=function(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }else{
        req.flash("error","Please log in to do that")
        res.redirect("/login")
    }
}


middlewareObj.checkCampgrounOwnership=function(req, res, next){
    if(req.isAuthenticated()){
          Campground.findById(req.params.id, function(err, campground){
            if(err){
                req.flash("error","campground not found")
             return res.redirect("back")
            }
            if(campground.author.id.equals(req.user._id)){
                next()
            }else{
                req.flash("error","Permission Denied!")
                res.redirect("back")
            }
              
            })
  
        }else{
            req.flash("error", "You need to be log in")
            res.redirect("back")
        }
    
}


middlewareObj.checkCommentOwnership=function(req, res, next){
    if(req.isAuthenticated()){
          Comment.findById(req.params.c_id, function(err, comment){
            if(err){
             return res.redirect("back")
            }
            if(comment.author.id.equals(req.user._id)){
                next()
            }else{
                res.redirect("back")
            }
              
            })
  
        }else{
            res.redirect("back")
        }
}


module.exports=middlewareObj