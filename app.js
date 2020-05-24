//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set("useUnifiedTopology", true);
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://louieg3:Louis0578@cluster0-zowe1.mongodb.net/poprockDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

///////// SYNTAX FOR CREATING A NEW SCHEMA FOR IMAGES
const imagesSchema = new mongoose.Schema({
  image: String,
  title: String,
  location: String,
});

const Image = mongoose.model("Image", imagesSchema);

///////////root route
app.get("/", function (req, res) {
  Image.find({}, function (err, images) {
    if (err) {
      console.log(err);
    } else {
      res.render("home", { images: images });
    }
  });
});

//////////compose route
app.get("/compose", function (req, res) {
  res.render("compose");
});

/////////FEATURED VIDEO POST SECTION
app.post("/imageSubmitForm", function (req, res) {
  const image = new Image({
    image: req.body.imageLink,
    title: _.startCase(req.body.imageTitle),
    location: req.body.locationInfo,
  });

  image.save(function (err) {
    if (!err) {
      res.redirect("/");
    } else {
      console.log(err);
    }
  });
});

///////BLOG DELETE SECTION
app.post("/deleteImage", function (req, res) {
  const deletedImage = _.startCase(req.body.deletedImage);

  Image.deleteOne({ title: deletedImage }, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
