import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
var result = null;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    if(!result){
      const response = await axios.get("https://bored-api.appbrewery.com/random");
      result = response.data;
    }
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  try{
    var url = `https://bored-api.appbrewery.com/filter?type=${req.body.type}&participants=${req.body.participants}`;
    console.log(url);
    const response = await axios.get(url);
    result = null;
    result = response.data.filter(x => x.type == req.body.type && x.participants == req.body.participants);
    const randomNumber = Math.floor(Math.random() * result.length);
    result = result[randomNumber];
    res.redirect("/");
  }catch(error){
    console.error("Failed to make request:", error.message);
    var errorMsg = (error.response.status == "404") ? "No activities that match your criteria" : error.message;
    res.render("index.ejs", {
      error: errorMsg,
    });
  }
  
  // Step 2: Play around with the drop downs and see what gets logged.
  // Use axios to make an API request to the /filter endpoint. Making
  // sure you're passing both the type and participants queries.
  // Render the index.ejs file with a single *random* activity that comes back
  // from the API request.
  // Step 3: If you get a 404 error (resource not found) from the API request.
  // Pass an error to the index.ejs to tell the user:
  // "No activities that match your criteria."
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
