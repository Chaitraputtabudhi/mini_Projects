import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "chaitra";
const yourPassword = "tilak";
const yourAPIKey = "2f1117ec-ac41-4d5a-ab18-fca8fa93bfa0";
const yourBearerToken = "283371ed-9766-4b70-87fb-bff2a7f0e3a5";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async(req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  try{
    const response = await axios.get(`${API_URL}/random`)
    res.render('index.ejs',{content: JSON.stringify(response.data)})
  }catch(error){
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth", async(req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
    try{
      const response = await axios.get(API_URL + "/all?page=1", {
        auth : {
          username : yourUsername,
          password : yourPassword,
        },
      })
      res.render('index.ejs',{content: JSON.stringify(response.data)})
    }catch(error){
      res.status(404).send(error.message);
    }
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  try{
    const response = await axios.get(API_URL + "/filter",{
      params:{
        score : 5,
        apiKey : yourAPIKey,
      },
    })
    res.render('index.ejs',{content: JSON.stringify(response.data)})
  }catch(error){
    res.status(404).send(error.message);
  }
});

app.get("/bearerToken",async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 2
  try{
    const response = await axios.get(API_URL + "/secrets/2",{
      headers : {
        Authorization : `Bearer ${yourBearerToken}`
      }
    });
    res.render('index.ejs',{content: JSON.stringify(response.data)})
  }catch(error){
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
