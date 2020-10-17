const express = require('express'); // Express
const router = express.Router(); // Router
const User = require('../model/User'); // Model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// Routes
router.post('/', (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields!' })
    }

    User.findOne({ email })
     .then(user => {
         if(user) {
             return res.status(400).json({ msg: 'User already exists' })
         }

         const newUser = new User({
             name,
             email,
             password
         })

         bcrypt.genSalt(10, (err, salt) => {
             bcrypt.hash(newUser.password, salt, (err, hash) => {
                 if(err) throw err;
                 newUser.password = hash;
                 newUser.save()
                 .then(user => {

                    jwt.sign(
                        { id: user.id }, // So whenever our frontend react or postman(if we are using that for testing), sends a webtoken, it will also send an id with that webtoken so our backend could know which user is logged in
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                },
                                token // along with user, we also want to send token...Here token is same as writing token: token. But simply writing token will work
                            })
                        }
                    )
                 })
             })
         })
     })
})  

module.exports = router 