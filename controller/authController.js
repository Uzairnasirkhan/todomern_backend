const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const UserModel = require("../models/userModel")

const AuthController = {
    login: async(req , res)=>{
        try {
            const body = req.body
        if(!body.email){
            res.status(404).json({
                isSuccessfull: false,
                error: "email is missing"
            })
        }
        if(!body.password){
            res.status(404).json({
                isSuccessfull: false,
                error: "password is missing"
            })
        }
    
        const existingUser = await UserModel.findOne({email: body.email})
    
        if(existingUser){
            const passwordMatched = await bcrypt.compare(
                body.password,
                existingUser.password
            )
        
            if(passwordMatched){
                const token = jwt.sign({...existingUser} , "abcd1234ghi567")
        
                res.status(200).json({
                    isSuccefull: true,
                    error: "Logged In Successfully",
                    data: {
                      user: existingUser,
                      token: token,
                    },
                  });
            }
            else{
                res.status(400).json({
                    isSuccefull: false,
                    error: "Wrong Password",
                  });
            }
        }
        else {
            res.status(401).json({
              isSuccefull: false,
              error: "user not found with this email",
            });
          }
        } catch (error) {
            console.log(error);
            res.status(400).json({
              isSuccefull: false,
              error: error.message,
            });
        }
    
    },


    Protected:async(req,res,next)=>{
        const token = req.headers?.authorization?.split(" ")[1];
        // console.log(token);
        if (!token) {
          res.status(401).json({
            isSuccefull: false,
            error: "Please login first!" 
          });
        }
        jwt.verify(token, "abcd1234ghi567", (err, dec) => {
          if (err) {
            res.status(401).json({
                isSuccefull: false,
                error: "You don't have rights",
                message: err.message
            });
          } else {
            next();
          }
        });
    },


    signup: async(req,res)=>{
        try {
            const body = req.body
            if(!body.email){
                res.status(404).json({
                    isSuccessfull: false,
                    error: "email is missing"
                })
            }
            if(!body.password){
                res.status(404).json({
                    isSuccessfull: false,
                    error: "password is missing"
                })
            }
    
            const existingUser = UserModel.findOne({email: body.email})
    
            if(!existingUser){
                res.status(400).json({
                    isSuccessfull: false,
                    error: "User already exists with this email"
                })
            }
            else{
                const hashedPassword = await bcrypt.hash(body.password , 10)
    
                const obj = {
                    firstName: body.firstName,
                    lastName: body.lastName,
                    email: body.email,
                    password: hashedPassword
                }
    
                const modelObj = new UserModel(obj)
    
                modelObj.save()
                .then((result)=>{
                    res.status(201).json({
                        isSuccessfull: true,
                        error: "User signed up successfully",
                        data: result
                    })
                }).catch((err)=>{
                   throw err
                })
            }
        } catch (error) {
             res.status(400).json({
                isSuccessfull: false,
                error: error.message
             })        
        }
    }
}

module.exports = AuthController