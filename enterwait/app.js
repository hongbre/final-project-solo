const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use(express.json());

app.use('/enterwait/request', require('./route/enterwait/request'));
app.use('/enterwait/cancel', require('./route/enterwait/cancel'));

app.listen(port, () => {
  console.log(`Enterwait Request System listening on port ${port}...`);
});
