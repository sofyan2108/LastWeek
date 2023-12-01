const express = require("express");
const app = express();

var bodyParser = require("body-parser");
var cors = require("cors");
// ini
var jsonParser = bodyParser.json();
//itu
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const port = 3000;

app.use(cors());
app.use(jsonParser);
app.use(urlencodedParser);

app.get("/", (req, res) => {
  res.json('Website A')
});

app.post('/github-event', (req, res) => {
  const { secret, event } = req.body;

  if (!secret || event !== 'event-a' && event !== 'event-b') {
    console.log('Invalid Payload');
    return res.status(400).json({ error: 'Invalid Payload' });
  }

  if (secret === 'secret123') {
    if (event === 'event-a') {
      console.log('Incoming Webhook for Event A');
      // Logika khusus untuk event A
    } else if (event === 'event-b') {
      console.log('Incoming Webhook for Event B');
      // Logika khusus untuk event B
    }

    res.json('Webhook handled successfully');
  } else {
    console.log('Wrong Secret');
    res.status(403).json({ error: 'Unauthorized' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});