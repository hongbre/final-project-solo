const { Consumer } = require('sqs-consumer');
const { SQSClient } = require('@aws-sdk/client-sqs');

require('dotenv').config();

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE
});

connection.connect();

const moment = require('moment');

const app = Consumer.create({
  queueUrl: process.env.QUEUE_URL,
  handleMessage: async (message) => {
    const messageBody = JSON.parse(message.Body).detail.dynamodb;

    if (messageBody.NewImage.request_status.N === '1') {     
      connection.query(`INSERT INTO request
        VALUES(
          '${messageBody.Keys.request_id.S}',
          ${messageBody.NewImage.request_status.N},
          '${messageBody.NewImage.child_id.S}',
          '${messageBody.NewImage.child_name.S}',
          '${messageBody.NewImage.child_birthday.S}',
          '${messageBody.NewImage.user_id.S}',
          '${messageBody.NewImage.parent_name.S}',
          '${messageBody.NewImage.parent_tel.S}',
          '${messageBody.NewImage.parent_address.S}',
          '${messageBody.NewImage.parent_postcode.S}',
          '${messageBody.NewImage.parent_email.S}',
          '${messageBody.NewImage.nursery_id.S}',
          '${moment(new Date(messageBody.Keys.create_date.S)).format('YYYY-MM-DD HH:mm:ss')}',
          '${moment(new Date(messageBody.Keys.create_date.S)).format('YYYY-MM-DD HH:mm:ss')}'
        )`, (error, results, fields) => {
        if (error) throw error;
        console.log(results);
        console.log(fields);
      });
    } else if(messageBody.NewImage.request_status.N === '99') {
      connection.query(`UPDATE request
        SET request_status = 99,
            change_date = '${moment(new Date(messageBody.Keys.create_date.S)).format('YYYY-MM-DD HH:mm:ss')}'
        WHERE request_id = '${messageBody.Keys.request_id.S}'
      `, (error, results, fields) => {
        if (error) throw error;
        console.log(results);
        console.log(fields);
      });
    }
  },
  sqs: new SQSClient({
    region: 'ap-northeast-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  }),
});

app.on('error', (err) => {
  console.error(err.message);
});

app.on('processing_error', (err) => {
  console.error(err.message);
});

app.start();
