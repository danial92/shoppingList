const express = require('express'); // Express
const router = express.Router(); // Router
const User = require('../model/User'); // Model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

// Routes
router.post('/', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields!' })
    }

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ msg: 'User does not exists' })
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

                    jwt.sign(
                        { id: user.id }, // So whenever our frontend react or postman(if we are using that for testing), sends a webtoken, it will also send an id with that webtoken we our backend could know which user is logged in
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
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

// This route is to get current user/user data as JWT doesn't save the user data in sessions. So, we need to validate user everytime when user signs in. 
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password') // select('-password') means without password. 
    .then(user => res.json(user)); 
    // upper two lines are working together. And here, what we are essentially doing is returning a user back without password. We are returning user's name, email, id but not the password. That' what select('-something') do.
}) // validates the user with token

module.exports = router 