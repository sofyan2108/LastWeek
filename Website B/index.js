const express = require("express");
const app = express();

var bodyParser = require("body-parser");
var cors = require("cors");
// ini
var jsonParser = bodyParser.json();
//itu
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const port = 3001;

app.use(cors());
app.use(jsonParser);
app.use(urlencodedParser);


app.get('/', async (req, res) => {
  res.json('Website B')
})

app.get("/trigger-webhook-event-a", async (req, res) => {
  try {
    //do something to trigger website a
    const data = {
      secret: "secret123",
      event : "event-a"
    };

    const response = await fetch("http://localhost:3000/github-event", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
  
  //return success
  res.json('Event A success')
} catch (error){
  console.log(error)
  res.status(500).json('Internal Server Error')
}
})

app.get("/trigger-webhook-event-b", async (req, res) => {
  try {
    //do something to trigger website a
    const data = {
      secret: "secret1235",
      event : "event-b"
    };

    const response = await fetch("http://localhost:3000/github-event", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
  
  //return success
  res.json('event success')
} catch (error){
  console.log(error)
}
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});