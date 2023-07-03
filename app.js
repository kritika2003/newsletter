
//app.use(express.static(__dirname));
//api key= 83a5841e9651c7fbd3ebf0176e9f2df8-us21
//audience id= 1aeebebe92

const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const request = require("request");


const client = require("@mailchimp/mailchimp_marketing");

app.use(bodyParser.urlencoded({

  extended: true

}));

app.use(express.static(__dirname));

app.get("/", function(request, response) {

  response.sendFile(__dirname + "/signup.html");

})

app.post("/", function(req, res) {
  

  var firstName = req.body.fName;

  var lastName = req.body.lName;

  var email = req.body.email;

 console.log(firstName, lastName, email)

 const subscribingUser = {

    firstName: firstName,

    lastName: lastName,

    email: email

  }
   
  const run = async () => {
    try{
    const response = await client.lists.addListMember("1aeebebe92", {

      email_address: subscribingUser.email,

      status: "subscribed",

      merge_fields: {

       fName : subscribingUser.firstName,

        lName : subscribingUser.lastName
        
      }
         
    });
    console.log(response.statusCode);
    if (response.statusCode===200){
         res.sendFile(__dirname + "/success.html");
          
          
      } else {
         res.sendFile(__dirname + "/failure.html");
          
          
      }
    console.log(response);
    }
  
  catch (err) {
      res.status(400).send(err)
      
  };
}
  run();

});

client.setConfig({

  apiKey: "83a5841e9651c7fbd3ebf0176e9f2df8-us21",

  server: "us21",

});

app.post("/failure", function(req,res){
    res.redirect("/");
});

app.listen(3000, function() {

  console.log("Server running on Port 3000.");

});

