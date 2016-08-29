var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Campground      = require("./models/campground"),
    seedDB          = require("./seeds"),
    Comment         = require("./models/comment"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    User            = require("./models/user"),
    methodOverride  = require("method-override"),
    flash           = require("connect-flash")
    
    
var commentRoutes       = require("./routes/commment"),
    campgroundRoutes    = require("./routes/campgrounds"),
    authRoutes          = require("./routes/index")
    

    
mongoose.connect("mongodb://localhost/yelp_camp")
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine", "ejs")
app.use(express.static(__dirname+"/public"))
app.use(methodOverride("_method"))
app.use(flash())
/*seedDB()*/


/*=========================
    PASSPORT CONFIG
=========================*/

app.use(require("express-session")({
    secret: "jsdflkjdsf fsdflksjflkdsjf dsfkdsjfñdlskjfdas f",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



app.use(function(req, res, next){
    res.locals.currentUser=req.user
    res.locals.error=req.flash("error")
    res.locals.success=req.flash("success")
    next()
})

app.use(authRoutes)
app.use("/campgrounds", campgroundRoutes)
app.use("/campgrounds/:id/comments", commentRoutes)

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Funca!")
})