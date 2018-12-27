const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'citydata'
});

connection.connect((err) => {
  if (err)
    return Promise.reject(err);
  else
    return Promise.resolve('Connected!');
});

module.exports = connection;

// class DAO {
//   constructor() {
//     this.con = mysql.createConnection({
//       host: 'localhost',
//       user: 'root',
//       password: 'password',
//       database: 'citydata'
//     });
//   }
//
//   connect() {
//     this.con.connect((err) => {
//       if (err) {
//         console.log('Connection error: ' + err);
//         return Promise.reject(err);
//       } else {
//         console.log('Connected!');
//         return Promise.resolve();
//       }
//     });
//   }
//
//   close() {
//     this.con.end();
//     console.log('Connection closed.');
//   }
//
//   query(sql, params = []) {
//     this.con.query(sql, params, (err, result) => {
//       if (err) {
//         return Promise.reject(err);
//       } else {
//         return Promise.resolve(result);
//       }
//     });
//   }
// }
//
// module.exports = DAO;
