const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = require('../config/keys');

const requireLogin = require('../middlewares/requireLogin');

const User = mongoose.model('UserModel');

router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
        return res.status(422).json({ error: 'Please fill all the required fields' });
    }
    else {
        User.findOne({ email: email })
            .then((savedUser) => {
                if (savedUser) {
                    return res.status(422).json({ error: 'User Already Exists with that Email' });
                }

                else {

                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            const user = new User({
                                email: email,
                                password: hashedPassword,
                                name: name
                            });

                            user.save().then((user) => {
                                res.status(200).json({ message: 'User Saved Successfully', response: user });
                            }).catch(error => {
                                console.log(error);
                                res.status(400).json({ error: 'Could not save User Details' });
                            })
                        })
                        .catch(err => {
                            console.log(err);
                        });


                }
            }).catch((err) => {
                console.log(err);
                res.status(400).json({ error: 'Some Error Occured!' })
            });
    }

});


router.post('/login',(req,res)=>{

    const {email,password}= req.body;
    if(!email || !password){
        return res.status(422).json({error:'Please fill all the required fields'});
    }
    else
    {
        User.findOne({email:email})
        .then((savedUser)=>{
            bcrypt.compare(password,savedUser.password)
            .then((isMatched)=>{
                if(isMatched){

                    const token = jwt.sign({_id:savedUser._id},JWT_SECRET_KEY);
                    res.status(200).json({message:'Logged In SuccessFully!',accessToken:token});
                }
               
                else
                res.status(400).json({error:'Invalid Credentials entered'});
            })
        })
        .catch((err)=>{
            console.log(err);
            return res.status(400).json({error:'Email or Password Not found'})
        });
    }
});

module.exports = router;