const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");
const articleRouter = require("./routes/articles");
const app = express();
const methodOverride = require("method-override");

//local host connection
// mongoose.connect("mongodb://localhost/blog");

const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

app.set("view engine", "ejs");

//allows new methods other than get and post to be called
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

app.listen(port, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on localhost5000");
});

app.use("/articles", articleRouter);
