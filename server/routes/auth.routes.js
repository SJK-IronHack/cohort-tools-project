const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
 
const router = express.Router();
const saltRounds = 10;

router.post('/signup', async (req, res) => {
    const { email, password, name } = req.body

    // Check if the email or password or name is provided as an empty string 
    if (email === '' || password === '' || name === '') {
        res.status(400).json({ message: "Provide email, password and name" });
        return;
    }

    // Use regex to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'Provide a valid email address.' });
        return;
    }
  
    // Use regex to validate the password format
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
        res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
        return;
    }

    try {
        const foundUser = await User.findOne({ email: email.toLowerCase().trim()})

        if (foundUser) {
            res.status(400).json({ message: "User already exists." });
            return;
        } 

        const salt = bcrypt.genSaltSync(saltRounds)
        const passwordHash = bcrypt.hashSync(password, salt)
        const userToRegister = { email: email, passwordHash, name: name }

        /*
        try {
            const salt = bcrypt.genSaltSync(saltRounds);
            const passwordHash = bcrypt.hashSync(password, salt);
            const userToRegister = { email: email, passwordHash, name: name };
            // ... rest of the code
        } catch (hashingError) {
            res.status(500).json({ message: 'Error hashing password', error: hashingError });
            console.log(hashingError);
            return;
        }
        */
        
        const newUser =  await User.create(userToRegister)
        res.status(201).json({ message: 'User created', newUser })
        console.log(newUser)

    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error})
        console.log(error)
    }
})

module.exports = router;