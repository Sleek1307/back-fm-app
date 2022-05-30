import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config()

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    database: process.env.database
}); 

connection.connect((err)=>{
    if(err){
        console.log(
            err
        )
    }else{
        console.log(
            'conection ready'
        )
    }
})

export default connection;