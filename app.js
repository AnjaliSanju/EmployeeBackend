// Task1: initiate app and run server at 3000

const express = require('express')
const app = express()
const cors=require('cors')
require('dotenv').config()
const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 

const mongoose=require('mongoose');
const { getEmployee, addEmployee, updateEmployee, deleteEmployee, getEmployeeById } = require('./Controllers/employeecontroller');

async function main(){
    await mongoose.connect(process.env.MONGODB_URL)

}

main().then(console.log('DB Connected'))
.catch(err=>console.log(err))

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

app.use(express.json())
app.use(cors())
const port=process.env.port ||3000
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Employee app listening on port ${port}`)
})

//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist',getEmployee)

//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id',getEmployeeById)

//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',addEmployee)

//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id',deleteEmployee)

//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist',updateEmployee)

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



