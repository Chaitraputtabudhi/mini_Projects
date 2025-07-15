import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

let latestData = null;
let latestError = null;

app.get('/', (req, res) => {
    res.render('index.ejs', { data: latestData, error: latestError })
    latestData=null
    latestError=null
})

app.post('/', async (req, res) => {
    try {
        const lat = req.body.lat;
        const lon = req.body.lon;
        const apiKey = '85cdbd8884e95c2e4c587076ab09cb52'
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        const result = response.data.weather[0].description
        latestData = result
        latestError = null
        // res.render('index.ejs', { data: result.weather[0].description })
    } catch (error) {
        latestError = "Not Available";
        latestData = null;
    }
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})