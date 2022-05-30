import connection from "./conection.js";

const queryAsync = (query) => {
    console.log('Estas en la query asincrona')
    return new Promise((resolve, reject) => {
      connection.query(query, (err, rows) => {
        if (!err) {
          resolve(rows);
        } else {
          reject(err);
        }
      });
    });
  }

export default queryAsync;