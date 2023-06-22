const mysql = require('mysql2/promise');
const moment = require('moment');

require('dotenv').config();

const connection = async (req, res, next) => {
  try {
    req.connection = await mysql.createConnection({
      host: process.env.HOSTNAME,
      user: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    });
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send('DB Connection Error!');
  }
};

const selectRequest = (body) => `
  SELECT *
    FROM request
   WHERE request_id = '${body.request_id}'
`;

const updateRequest = (body) => `
  UPDATE request
     SET request_status = ${body.request_status},
         change_date = '${moment(new Date(body.create_date)).format('YYYY-MM-DD HH:mm:ss')}'
   WHERE request_id = '${body.request_id}'
`;

const insertChild = (body) => `
  INSERT INTO nursery_child(nursery_id,
                            child_id,
                            child_name,
                            child_birthday,
                            parent_name,
                            parent_tel,
                            parent_address,
                            parent_postcode,
                            parent_email,
                            create_date,
                            change_date)
  VALUES('${body.nursery_id}',
         '${body.child_id}',
         '${body.child_name}',
         '${body.child_birthday}',
         '${body.parent_name}',
         '${body.parent_tel}',
         '${body.parent_address}',
         '${body.parent_postcode}',
         '${body.parent_email}',
         '${moment(new Date(body.create_date)).format('YYYY-MM-DD HH:mm:ss')}',
         '${moment(new Date(body.create_date)).format('YYYY-MM-DD HH:mm:ss')}')
  ON DUPLICATE KEY
  UPDATE child_name = '${body.child_name}',
         child_birthday = '${body.child_birthday}',
         parent_name = '${body.parent_name}',
         parent_tel = '${body.parent_tel}',
         parent_address = '${body.parent_address}',
         parent_postcode = '${body.parent_postcode}',
         parent_email = '${body.parent_email}',
         create_date = '${moment(new Date(body.create_date)).format('YYYY-MM-DD HH:mm:ss')}',
         change_date = '${moment(new Date(body.create_date)).format('YYYY-MM-DD HH:mm:ss')}'
`;

module.exports = {
  connection,
  queries: {
    selectRequest,
    updateRequest,
    insertChild
  }
};
