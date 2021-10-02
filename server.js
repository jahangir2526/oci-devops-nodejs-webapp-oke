'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('<html><body style="background-color:red;"><hr><h1 style="color:lightblue;" align=center> ~~ Hello World ~~ Keep Smiling ~~ </h1><hr></body></html>');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
