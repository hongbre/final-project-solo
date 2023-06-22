const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use(express.json());

app.use('/request/accept', require('./route/request/accept'));
app.use('/request/reject', require('./route/request/reject'));

app.listen(port, () => {
  console.log(`Nursery System listening on port ${port}...`);
});
