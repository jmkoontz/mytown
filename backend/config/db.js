const mysql = require('mysql');

class Database {
  constructor() {
    this.con = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'citydata'
    });
  }

  query(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.con.query(sql, params, (err, result) => {
        this.close(); // close database connection
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.con.end((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

module.exports = Database;
