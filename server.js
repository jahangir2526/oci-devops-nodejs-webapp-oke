'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('<html><body style="background-color:red;"><h1 style="color:lightgrey;" align=center> <br><br><br><br><br><br><br><hr>~~~ Hello World // Keep Smiling :)<hr></h1></body></html>');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
