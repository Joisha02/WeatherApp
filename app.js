const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res) {
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const query=req.body.cityName;;
  const apikey="bd8f89911c4c779c03a699dabab3e525";
  const unit="metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apikey;
  https.get(url, function(respond) {
    console.log(respond.statusCode)

    respond.on("data", function(data) {
      const weatherdata = JSON.parse(data);
      console.log(weatherdata);

      const desc = weatherdata.weather[0].description;
      console.log(desc);
      const temp = weatherdata.main.temp
      console.log(temp);
      const icon = "http://openweathermap.org/img/wn/" + weatherdata.weather[0].icon + "@2x.png"

      res.write("<h1>The temperature of "+query+" today is " + temp + " degree Celcius</h1>");
      res.write("<p>Weather description is " + desc + "</p>");
      res.write("<img src=" + icon + ">");
      res.send();
    });

  });


})







app.listen(3000, function() {
  console.log("Server started on port 3000");
});
