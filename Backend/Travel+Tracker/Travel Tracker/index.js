import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

const db = new pg.Client({
  user : "postgres",
  database : "world",
  password : "postgres123",
  host : "localhost",
  port : 5432
})

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries");

  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  console.log(countries);
  res.render("index.ejs", { countries: countries, total: countries.length });
});

app.post('/add',async(req,res)=>{
  const country = req.body.country;
  try{
    const result = await db.query("select country_code from countries where lower(name) = lower($1) ",[country]);
      const data = result.rows[0];
      const countryCode = data.country_code;
      try{
        await db.query("insert into visited_countries (country_code) values ($1)",[countryCode,]);
        res.redirect("/");
      }catch(err){
        console.log(err)
        const countries = await checkVisisted();
        res.render("index.ejs", { countries: countries, total: countries.length, error:"Country has been added already,try again." })
      }    
  }catch(err){
    console.error(err)
    const countries = await checkVisisted();
    res.render("index.ejs", { countries: countries, total: countries.length, error:"Country does not exists try again." });
  }
  

})


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
