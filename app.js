//jshint esversion: 6

const request = require("request");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/56d1093c5f",
    method: "POST",
    headers: {
      "Authorization": "salah1 5f87f7daf11d2e08740747fdc348744a-us20"
    },
    body: jsonData
  };

  //console.log(firstName, lastName, email);
  request(options, function(error, response, body){
    /*if(error){
      console.log(error);
    } else{
      console.log(response.statusCode);
    }*/
    /*if(response.statusCode === 200){
      res.send("<h1>Success</h1>");
    } else{
      res.send("<h1>An error has occured</h1>");
    }*/
    /*if(error){
      res.send("There was an error with signing up, please try again!");
    } else {
      if(response.statusCode === 200){
        res.send("Successfully subscribed!");
      } else{
        res.send("There was an error with signing up, please try again!");
      }
    }*/
    if(error){
      res.sendFile(__dirname + "/failure.html");
    } else {
      if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      } else{
        res.sendFile(__dirname + "/failure.html");
      }
    }
    //Note that signing up with "gmail" in the email address will require the email address to exist,
    //that's why we use 1@2.com for example, otherwise the new member won't be added to the list

    //Note that signing up with the same email twice won't add another member to the list,
    //but won't give an error either here
  });

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});

// API Key
// 5f87f7daf11d2e08740747fdc348744a-us20

// List ID
// 56d1093c5f
