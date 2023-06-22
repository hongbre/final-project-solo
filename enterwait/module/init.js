const createTables = () => `
  CREATE TABLE \`request\` (
    \`request_id\` varchar(100) NOT NULL,
    \`request_status\` int NOT NULL,
    \`child_id\` varchar(100) NOT NULL,
    \`child_name\` varchar(100) NOT NULL,
    \`child_birthday\` varchar(100) NOT NULL,
    \`user_id\` varchar(100) NOT NULL,
    \`parent_name\` varchar(100) NOT NULL,
    \`parent_tel\` varchar(100) NOT NULL,
    \`parent_address\` varchar(150) NOT NULL,
    \`parent_postcode\` varchar(5) NOT NULL,
    \`parent_email\` varchar(100) NOT NULL,
    \`nursery_id\` varchar(100) NOT NULL,
    \`create_date\` timestamp NOT NULL,
    \`change_date\` timestamp NOT NULL,

    PRIMARY KEY (
      \`request_id\`
    )
  );

  CREATE TABLE \`nursery\` (
    \`nursery_id\` varchar(100) NOT NULL,
    \`nursery_password\` varchar(100) NOT NULL,
    \`nursery_name\` varchar(100) NOT NULL,
    \`nursery_tel\` varchar(100) NOT NULL,
    \`postcode\` varchar(5) NOT NULL,
    \`address\` varchar(150) NOT NULL,
    \`email\` varchar(100) NOT NULL,
    \`capacity\` int NOT NULL,
    \`create_date\` timestamp NOT NULL,
    \`change_date\` timestamp NOT NULL,

    PRIMARY KEY (
      \`nursery_id\`
    )
  );

  CREATE TABLE \`child\` (
    \`child_id\` int NOT NULL,
    \`child_name\` varchar(20) NOT NULL,
    \`child_birthday\` varchar(10) NOT NULL,
    \`user_id\` int(15) NOT NULL,
    \`create_date\` timestamp NOT NULL,
    \`change_date\` timestamp NOT NULL,

    PRIMARY KEY (
      \`child_id\`
    )
  );

  CREATE TABLE \`user\` (
    \`user_id\` varchar(15) NOT NULL,
    \`user_password\` varchar(20) NOT NULL,
    \`user_name\` varchar(15) NOT NULL,
    \`user_brithday\` varchar(10) NOT NULL,
    \`user_postcode\` int NOT NULL,
    \`user_address\` varchar(50) NOT NULL,
    \`create_date\` timestamp NOT NULL,
    \`change_date\` timestamp NOT NULL,

    PRIMARY KEY (
      \`user_id\`
    )
  );
`;

module.exports = createTables;
