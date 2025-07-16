// HINTS:
// 1. Import express and axios
import express from 'express';
import axios from 'axios';
import bodyParser from "body-parser";

// 2. Create an express app and set the port number.
const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

// 3. Use the public folder for static files.


// 4. When the user goes to the home page it should render the index.ejs file.
app.get('/',async(req,res)=>{
    try{
        const result = await axios.get('https://secrets-api.appbrewery.com/random');
        console.log(result)
        res.render('index.ejs',{
            secret: result.data.secret,
            user: result.data.username,
        })
    }catch(error){
        res.status(500).res.send(error)
    }
})

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
app.listen(port,()=>{
    console.log(`Listening on port : ${port}`)
})