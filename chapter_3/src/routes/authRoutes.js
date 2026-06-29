import express from 'express';
import db from "../db.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
const router=express.Router()

router.post("/register",(req,res)=>{
    const {username,password} =req.body
    
    const hashPassword=bcryptjs.hashSync(String(password),8)
    try {
        const insertUser=db.prepare(`INSERT INTO users (username,password) VALUES (?,?)`)
        const result=insertUser.run(username,hashPassword)
        //插入第一个默认todos
        const defautTodos="Create your first todos to start!"
        const insertTodos=db.prepare(`INSERT INTO todos (user_id, task) VALUES (?,?)`)
        insertTodos.run(result.lastInsertRowid, defautTodos)

        //创建jwt令牌
        const token=jwt.sign({id:result.lastInsertRowid},process.env.JWT_SECRET,{expiresIn:"24h"})
        res.json({token})
    } catch (error) {
        console.log(error)
        res.sendStatus(501)
    }

})

router.post("/login",(req,res)=>{
    const {username,password} =req.body
    try {
        const getUser= db.prepare(`SELECT * FROM users WHERE username=?`)
        const user=getUser.get(username)
        //如果用户不存在
        if(!user){
            return res.status(404).send({message:"User is not found"})
        }
    
        //如果密码不正确
        const isPasswordInvalid= bcryptjs.compareSync(password,user.password)
        if(!isPasswordInvalid){
            return res.status(401).send({message:"Password is invalid"})
        }
    
        //成功
        const token=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:"24h"})
        console.log(user)
        res.json({token})
    } catch (error) {
        console.log(error.message)
        res.sendStatus(503)
    }
})


export default router