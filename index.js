require("dotenv").config();

const express = require("express")
const pool = require('./db')

const app= express(); 

app.get('/',(req,res)=>{
    res.send('hello from jignesh');
})

app.get('/tasks',async (req,res)=>{
    const result = await pool.query("SELECT * FROM tasks"); 
    res.json(result.rows);
})

app.listen(3000,()=>{
    console.log("server is ruuning on port 3000")
})