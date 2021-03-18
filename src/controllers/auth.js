const User = require('../models/user.js');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const shortid = require('shortid')

exports.signup = (req, res) => {

    User.findOne({ email:  req.body.email})
    .exec(async(error, user)=>{
        if(user) return res.status(400).json({
            message: 'User already registered'
        })

        const {firstName, lastName,
                email, password, contactNumber } = req.body
        
        const hash_password = await bcrypt.hash(password, 10)
            
        const _user = new User({ firstName, lastName,
                                    email, hash_password, contactNumber,
                                    username: shortid.generate()})
        
        _user.save((error, data) => {
            if (error) {
                return res.status(400).json({
                    message: "Something went wrong"
                })
            } 
            
            if(data){
                res.status(201).json({message: "User created successfully...!"})
            }
        })


    })
}

exports.signin = (req, res) => {
    const {email, password} = req.body
    User.findOne({email})
    .exec(async (error, user) => {
        if (error) return res.status(400).json({error})
        if(user){
            if(await user.authenticate(password) && user.role === 'user'){
                const token = jwt.sign({_id:user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1d'})
                const {_id, firstName, lastName, email, role, fullName} = user
                res.status(200).json({token, user: {
                    _id, firstName, lastName, email, role, fullName
                }})
            } else return res.status(400).json({message: 'Something went wrong'})
        } else {
            return res.status(400).json({message: 'No such user'})
        }
    })
}

