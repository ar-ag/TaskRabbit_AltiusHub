const express = require('express');
const app = express();
const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config({path:'./.env'});
// const { userModel } = require('mongoose');
const jwt = require('jsonwebtoken')
const salt = 10;

const JWT_KEY = process.env.JWT_KEY;
const addUser = async(req, res) => {
    try {
        const userName = req.body.name;
        const userEmail = req.body.email;
        const userPassword = req.body.password;

        const existingUser = await User.findOne({email:userEmail});
        if(existingUser) {
            console.log("user already exists");
            res.status(401);

            throw new Error('user already exists')
        }

        const hashedPassword = await bcrypt.hash(userPassword, salt);
        
        const user = await User.create({
            name: userName,
            email: userEmail,
            password: hashedPassword
        })
        res.status(200).send('user Added');

    } catch(error) {
        console.log("Error", error);
        res.status('500').send(error);
    }
}

const loginUser = async(req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).send('no such user');
            // throw new Error('no such user');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send('Wrong Password');
        }   
        console.log(JWT_KEY);
        const token = jwt.sign({ userId: user._id }, 'JWT_KEY', {
            expiresIn: '1h',
        });
        res.status('200').send({token});
    } catch (err) {
        console.log("error", err);
        res.status('500').send(err);
    }
}

/*
@ GET suer profile on validating user using JWT Token

*/
const getProfile = async(req, res) => {
    try {
        
    } catch (error) {

    }
}

module.exports = {addUser, loginUser, getProfile};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzIwYjJkNjUyZWVjNWFkY2YyMjBjYWIiLCJpYXQiOjE3MzAxOTc1MTEsImV4cCI6MTczMDIwMTExMX0.FqOrX_BPtPvJ493LmT2m5FH7pzrcvA6u66CQSTjLFEk