const express = require("express")
const bodyParser = require("body-parser")
const ejs = require('ejs');
const dirname = require("path");
const fileURLToPath = require("url");
//const __dirname = dirname(fileURLToPath(import.meta.url));
var _ = require('lodash');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


var userIsAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true }));

function passwordCheck (req, res, next) {
    const password = req.body["password"];
    const username = req.body["username"];
    if(password === "Arun" && username === "hughjackman"){
        userIsAuthorised = true;
    }
    next();
}
app.use(passwordCheck);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
if(userIsAuthorised === true){
    res.sendFile(__dirname + "/D:\courses contents\Backend\Blog app\views\login.ejs");
}else{
    res.sendFile(__dirname + "/public/index.html");
}
});

const homeOfContent = "Daily Quotes: Patience is the companion of wisdom.";
const aboutContent = "This is a page which allows the user enter their blog and It was developed by me Arunachalam";
const contactContent = "Phone no: 9025041278"
                       "email no: arunachalammail235@gmail.com";

const posts = [] 
app.get("/", (req, res)=>
{
  res.render("login",{LoginContent:LoginContent, posts: posts})
})

app.get("/Submit", (req, res)=>
{
  res.render("home",{homeContent:homeOfContent, posts: posts})
})


app.get("/about", (req, res)=>
{
  res.render("about",{aboutContent:aboutContent})
})

app.get("/contact", (req, res)=>
{
  res.render("contact",{contactContent:contactContent})
})


app.get("/compose", (req,res)=>{
  res.render("compose");
 });
 var postTitle = null;
 var postContent = null;
 
 posts['title'] = postTitle
 posts['content'] = postContent

 app.post('/compose', (req, res) => {
  const postTitle = req.body.postTitle
  const postContent = req.body.postContent

  const postObj = {
    "title":postTitle,
    "content":postContent
  }
  posts.push(postObj)
  res.redirect('/')
  console.log(posts)
 })  

 app.get('/posts/:postID', (req, res) => {
  let postTitle = req.params.postID
  let postContent = ''
  let title = ''

  posts.forEach((post) => {
      post.title
      post.content
    })


  posts.forEach((post) => {
    title=post.title
    content=post.content
  }) 

  if (_.toLower(postTitle) == _.toLower(title)) {
    res.render(
      'post', 
      {
        title,
        content
      })
  }
})


  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  
 