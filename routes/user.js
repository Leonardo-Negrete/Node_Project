const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router();
const db = require('../config/database');

user.post("/login", async (req,res,next)=>{
    const {user_mail,user_password} = req.body;
    const query = `SELECT * FROM administradores WHERE user_mail = '${user_mail}' AND user_password = '${user_password}';`;
    const rows = await db.query(query);

    if(user_mail && user_password){
    if(rows.length == 1) {
const token = jwt.sign({
    user_id: rows[0].user_id,
    user_mail: rows[0].user_mail
    
}, "debugkey");
       return res.status(200).json({code:200,message: token})
    }
    else{
        return res.status(200).json({code:401 ,message: "Usuario o contraseña incorrecta"})
    }
}
return res.status(200).json({code:500,message: "Campos incompletos"})
})
user.get("/", async (req,res,next)=>{
    const query = "SELECT * FROM administradores;";
    const rows = await db.query(query);

    return res.status(200).json({code: 200, message: rows})
})
module.exports = user;