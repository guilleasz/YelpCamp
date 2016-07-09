var express=require("express")
var app= express()

app.set("view engine", "ejs")
app.get("/", function(req, res){
    res.render("landing")
})

app.get("/campgrounds", function(req, res){
    var campgrounds=[
        {name: "Salmon Creek", image:"http://oddculture.com/wp-content/uploads/2015/12/Camping-Near-The-Lake-Background-Wallpaper.jpg"},
        {name: "Granite Hill", image:"http://www.droomplekken.nl/images/dp/banff_jasper_yoho/Kamperen.jpg" },
        {name: " Mountain Goats Rest", image:"http://integeneral.com/wp-content/uploads/2015/08/162.jpg" }
        ]
        res.render("campgrounds", {campgrounds: campgrounds})
})
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Funca!")
})