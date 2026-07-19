import express from "express";
import db from "./db.js"; 
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();


const app = express(); 
app.use(express.json()); 
app.use(cors());
app.use(express.static('public'));
app.post("/api/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
//   const {username, password} = req.body
  console.log(`user : ${username}, password : ${password}`);
  

  const [users] = await db.query("SELECT * FROM users WHERE username = ? ", [username]);

  
  if (users.length === 0 || !(await compare(password, users[0].password))) {
    return res.status(404).json({msg: "User not found"});
  }
  
  const payload ={
    id: users[0].id,
    username : users[0].username
  }

  const token = jwt.sign(
    payload,
    process.env.SECRET_KEY,
    { expiresIn: '2h' } 
  );


  res.json({msg: "login สำเร็จ", token : token, user : payload});
  //  res.send("login success");


});

app.listen(process.env.PORT, () => {
  console.log("Server ทำงานที่ http://localhost:"+process.env.PORT); 
});
