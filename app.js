//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog", { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

const blogSchema = new mongoose.Schema({
  title:{type:String, required:true},
  desc:{type:String, required:true}
});

const BlogTable = mongoose.model("post", blogSchema);

/*var x = new BlogTable({
  title:"my",
  desc:"desc"
});

x.save();*/

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var posts = [];

app.get("/", function(req,res){

  BlogTable.find({},{},{},function (err, postLists) {
    if(!err){
      //console.log(postLists);
      res.render("home", {homecontent:homeStartingContent, allposts:postLists});
    }
  });
});

app.get("/about", function(req,res){
  res.render("about", {aboutcontent:aboutContent});
});

app.get("/contact", function(req,res){
  res.render("contact", {contactcontent:contactContent});
});

app.get("/compose", function(req,res){
  res.render("compose");
});

app.get("/posts/:topic", function(req,res){
  var str = _.lowerCase(req.params.topic)
console.log(str);
  BlogTable.findOne({title:req.params.topic}, function (err, thePost) {
    if(!err){
      //console.log("no err");
      if(thePost!=null){
        //console.log(thePost);
          res.render("post", {post:thePost});
      } else {
          //console.log("empty");
      }
    }
  })

  /*for(var i=0;i<posts.length;i++)
  {
    if(_.lowerCase(posts[i].title)==str){
      res.render("post", {post:posts[i]});
    }
  }*/
//res.send("match not found");
});

app.post("/", function (req, res){
  var post = new BlogTable({
    title : req.body.title,
    desc :req.body.desc
  });

  post.save().then();
  res.redirect("/");
});

app.post("/delete/:topic", function (req, res){
  var id = req.params.topic;
  var chkVal = req.body.chk;
  //console.log(chkVal);
  //console.log("id is" + id);
  BlogTable.findByIdAndRemove(id, function (err) {
    if(!err){
      res.redirect("/");
    }
  });

  //post.save().then();
  //res.redirect("/");
});









app.listen(3000, function() {
  console.log("Server started on port 3000");
});
