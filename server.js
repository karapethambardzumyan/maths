const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser('json'));
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('*', (req, res) => {
  return res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(8000, () => console.log('Server has started on port 8000!'));
