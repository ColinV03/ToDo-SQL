import React, { useState } from 'react';
import './App.css';
import Axios from "axios"
// import axios from 'axios';
// import { create } from 'lodash';



function App() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [tenure, setTenure] = useState(0);
  
  const [employeeList, setEmployeeList] = useState([])
// for testing purposes:
  // const displayInfo = () => {
  // console.log(`${name} + ${title} + ${email} + ${phone} + ${tenure}`)
  // }
  
  const addEmployeee = () => {
     
    Axios.post("http://localhost:3001/create",
      {
        name: name,
        title: title,
        email: email, 
        phone: phone, 
        tenure: tenure
      }).then(() => {
        setEmployeeList([ ...employeeList, {
          name: name,
          title: title,
          email: email, 
          phone: phone, 
          tenure: tenure
        },
      ])
      });
  }

  const getEmployeeList = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList([...response.data]);
      
    });
    console.log(employeeList)
  };


  const editEmployee = (key) => {
    
    console.log(`Editing Employee at ${key}`)
    Axios.put("http://localhost:3001/employees").then((response) => {
      console.log(response.data);
    });
  }
//     var data = {
//         id: member.id
//     }
//     fetch("/users/delete", {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(data)
//     }).then(function(response) {
//         if (response.status >= 400) {
//           throw new Error("Bad response from server");
//         }
//         return response.json();
//     }).then(function(data) {
//         if(data === "success"){
//            this.setState({msg: "User has been deleted."});  
//         }
//     }).catch(function(err) {
//         console.log(err)
//     });
// }



  return (
    <div className="App">
      <header className="App-header">
        <header>Employee List:</header>
        <div className="form">
          <label>Name</label>
          <input type="text" onChange={(e) => setName(e.target.value)}></input>

          <label>Title</label>
          <input type="text" onChange={(e) => setTitle(e.target.value)}></input>

          <label>Email</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)}></input>

          <label>Phone</label>
          <input
            type="number"
            onChange={(e) => setPhone(e.target.value)}
          ></input>

          <label>Tenure</label>
          <input
            type="number"
            onChange={(e) => setTenure(e.target.value)}
          ></input>
          <button className="addButton" onClick={addEmployeee}>
            {" "}
            Add Employee
          </button>
          <br />
        </div>
        <div className="showEmployees">
          <button onClick={getEmployeeList}>Show Employees:</button>
          {employeeList.map((val, key) => {
            return (
              <div className="employeeCard">
                <h3>Name: {val.name}</h3>
                <h6>Title: {val.title}</h6>
                <h6>Email: {val.email}</h6>
                <h6>Phone: {val.phone}</h6>
                <h6>Tenure: {val.tenure} Year</h6>
                <button className="deleteUser" onClick={() => editEmployee(key)}> delete Entry</button>
              </div>
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
