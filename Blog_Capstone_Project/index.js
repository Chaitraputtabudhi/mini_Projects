import express from 'express';
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get('/',(req,res) =>{
    res.render('home.ejs',{posts});
})

app.get("/compose", (req, res) => {
  res.render("compose.ejs", { post: null });
});

app.post('/compose', (req, res) => {
    const { title, content, author } = req.body;
    const id = Date.now().toString();
    const date = new Date();
    posts.push({ id, title, content, date, author: author || "Anonymous" });
    res.redirect('/');
});


app.get('/post/:id',(req,res) =>{
    const postId = req.params.id;
    const post = posts.find(p => p.id === postId);
    if (post) {
        res.render('post.ejs', { post });
    } else {
        res.status(404).send('Post not found');
    }
})

app.get("/edit/:id", (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    if (post) {
        res.render("compose.ejs", { post });
    } else {
        res.status(404).send("Post not found");
    }
});

app.post("/edit/:id", (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    if (post) {
        post.title = req.body.title;
        post.content = req.body.content;
        post.author = req.body.author;
    }
    res.redirect("/");
});

app.post('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id !== req.params.id);
    res.redirect('/');
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})