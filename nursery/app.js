const express = require('express');
const app = express();
const port = 4000;

const { connection } = require('./module/mysql');
const { createTables } = require('./module/init');

app.get('/', (req, res) => {
  res.status(200).send('Hello, World!');
});

app.get('/admin/init', connection, async (req, res) => {
  try {
    const [ createResults ] = await req.connection.query(createTables());
    res.send('DB 초기화에 성공하였습니다.');
  } catch (err) {
    console.log(err);
    res.send('DB 초기화에 실패하였습니다.');
  }
});

app.use(express.json());

app.use('/request/accept', require('./route/request/accept'));
app.use('/request/reject', require('./route/request/reject'));

app.listen(port, () => {
  console.log(`Nursery System listening on port ${port}...`);
});
