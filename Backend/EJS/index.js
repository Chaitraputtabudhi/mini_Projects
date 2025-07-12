import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    const dayIndex = new Date().getDay();
    console.log(dayIndex)
    let type = "";
    let advice = "";
    switch(dayIndex) {
        case 0 :
            type = "Sunday";
            advice = "Relax and enjoy your day!";
            break;
        case 1 :
            type = "Monday";
            advice = "Its time to work hard.Keep pushing through!";
            break;
        case 2 :
            type = "Tuesday";
            advice = "Its time to work hard.Keep pushing through!";
            break;
        case 3 :
            type = "Wednesday";
            advice = "Its time to work hard.Keep pushing through!";
            break;
        case 4 :
            type = "Thursday";
            advice = "Its time to work hard.Keep pushing through!";
            break;
        case 5 :
            type = "Friday";
            advice = "Its almost weekend.Keep pushing through!";
            break;
        case 6 :
            type = "Saturday";
            advice = "Relax and enjoy your day!";
            break;
        default:
            type = "Unknown day";
            advice = "No advice available.";
            break;
        
    }
    // let type = "a weekday";
    // let advice = "Its time to work hard.Keep pushing through!";
    // if(dayIndex === 0 || dayIndex === 6) {
    //     type = "a weekend";
    //     advice = "Relax and enjoy your day!";
    // }
  res.render('index.ejs', {
    dayType: type,
    advice: advice,
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
