const mysql2 = require("mysql2");

const db = mysql2.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})

db.connect((err) => {
    if(err){
        console.error("errr0r on ur mysql2:", err);
    }else{
        console.log("Connected to mysql")
    }
})


module.exports = {db}