import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "user";
const yourPassword = "pass";
const yourAPIKey = "12d864eb-03a0-4a40-bbd6-d4c05318d83e";
const yourBearerToken = "2a13eaa9-758e-4dcd-85bb-75bbd1cec968";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  var content;
  try{
  var response = await axios.get("https://secrets-api.appbrewery.com/random");
  content = JSON.stringify(response.data);
  }catch(err){
    console.log(`Error : ${err.message}`);
    content = err.message;
  }
  res.render('index.ejs', {content : content});

});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */

    var content;
    try{
    var response = await axios.get("https://secrets-api.appbrewery.com/all?page=2", 
    {
      auth:{
        username : yourUsername,
        password : yourPassword
      }
    });
    content = JSON.stringify(response.data);
    }catch(err){
      console.log(`Error : ${err.message}`);
      content = err.message;
    }
    res.render('index.ejs', {content : content});
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.

  var content;
  try{
  var response = await axios.get("https://secrets-api.appbrewery.com/filter", 
  {
    params : {
      score : "5",
      apiKey : yourAPIKey
    }
  });

  content = JSON.stringify(response.data);
  }catch(err){
    console.log(`Error : ${err.message}`);
    content = err.message;
  }
  res.render('index.ejs', {content : content});
  
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
  var content;
  try{
  var response = await axios.get("https://secrets-api.appbrewery.com/secrets/42", 
  {
    headers: { 
      Authorization: `Bearer ${yourBearerToken}` 
    }
  });
  content = JSON.stringify(response.data);
  }catch(err){
    console.log(`Error : ${err.message}`);
    content = err.message;
  }
  res.render('index.ejs', {content : content});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
