import express from 'express';
const app = express();
const port = 3000;

app.get('/',(req,res)=>{
    res.send('Hello World!');
})

app.get('/contatct',(req,res)=>{
    res.send('<h1>Contact Page</h1>');
})

app.get('/about',(req,res)=>{
    res.send('<h1>About Me</h1>');
})

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})