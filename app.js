//app.use(express.static(__dirname));
//api key= 83a5841e9651c7fbd3ebf0176e9f2df8-us21
//audience id= 1aeebebe92

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const client = require("@mailchimp/mailchimp_marketing");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(__dirname));
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/signup.html");
});
//12613442
app.post("/", function (req, res) {
  const {fName, lName , email}= req.body;
  console.log(fName, lName, email);
try{
  const run = async () => {
    try{
      const response = await client.lists.addListMember("f5b9972a45", {
        email_address:email,
        status: "subscribed",
        merge_fields: {
          FNAME:fName,
          LNAME:lName,
        },
      });
      console.log("response",response);
      console.log(response.id,"id");
      console.log(response.statusCode);
        res.sendFile(__dirname + "/success.html");
      console.log(response);
    }catch(error){
      console.log(error);
      res.sendFile(__dirname + "/failure.html");
    }
  };
  run();
}catch(error){
  console.log(error);
  res.sendFile(__dirname + "/failure.html");
}
});

client.setConfig({
  apiKey: "8cd0f1264a4c902a691390db2aa9cb2d-us21",
  server: "us21",
});

app.get("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server running on Port 3000.");
});
//8cd0f1264a4c902a691390db2aa9cb2d-us21