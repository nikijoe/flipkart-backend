const express = require('express');

const { signup, signin} = require('../controllers/auth');
const { validateSignupRequest, validateSigninRequest,
        isRequestValidated } = require('../validators/auth');

const router = express.Router()

router.post('/signin',validateSigninRequest,  isRequestValidated, signin)
router.post('/signup', validateSignupRequest, isRequestValidated, signup)
// router.post('/signout', validateSignupRequest, isRequestValidated, signout)

// router.post('/profile', requireSignin, (req, res) => {
//     console.log(req.user)
//     res.status(200).json({user: "Profile"})
// })

module.exports = router