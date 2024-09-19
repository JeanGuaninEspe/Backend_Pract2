// conexion.js
import mysql from 'mysql';

console.log("entra a conexion");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'VincProj2021',
    database: 'mies',
    multipleStatements: true
});

export function getConnection(cb) {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("error conexion");
            console.log(err);
            return cb(err);
        }
        cb(null, connection);
    });
}
