
require("dotenv").config();

const express = require("express");
const cors = require('cors')
const mysql = require('mysql2');



const app = express();
app.use(cors())
app.use(express.json())

//create db 
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Password1',
    database: 'employeesystem'
})


app.post('/create', (req, res) => {
    
    const name = req.body.name
    const title = req.body.title;
    const email = req.body.email;
    const phone = req.body.phone;
    const tenure = req.body.tenure;
    
    db.query('INSERT INTO employees (name, title, email, phone, tenure) VALUES (?,?,?,?,?)',
        [name, title, email, phone, tenure],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send('Values Inserted');
            }
        }
    )
})

app.put("/employees", (req, res) => {
  console.log(req.body)
  // const name = req.body.name;
  // const title = req.body.title;
  // const email = req.body.email;
  // const phone = req.body.phone;
  // const tenure = req.body.tenure;

  // let sqlQuery = `UPDATE employee SET (name, title, email, phone, tenure) VALUES (?,?,?,?,?) WHERE id = ${key}  `
  // db.query(
  //   sqlQuery,
  //   [name, title, email, phone, tenure],
  //   (err, result) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       res.send("Values updated");
  //     }
  //   }
  // );
});




app.get('/employees', (req, res) => {
     db.query("SELECT * FROM employees",
       (err, result) => {
         if (err) {
           console.log(err);
         } else {
           res.send(result)
         }
       }
     );
})

// app.delete("/employees/:id", function (req, res) {
//     let sql = "DELETE from members where id = " + req.body.id + "";
//     db.query(sql, function (error, results, fields) {
//         if (!error) {
//           res.send("Deleted Successfully")
//         } else {
//             console.log(error)
//       }
//     }
//   );
// });



//set port, listen for requests: 
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
});








