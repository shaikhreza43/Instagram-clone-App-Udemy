const router = require('express').Router();
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Post = mongoose.model('PostModel');

router.post('/create-post',requireLogin,(req,res)=>{
    const {title,body} = req.body;
    if(!title || !body){
        return res.status(422).json({error:'Post must have at least a title and a bosy'});

    }
    else{  
        req.user.password = undefined;
        const post = new Post({
            title:title,
            body:body,
            postedBy:req.user
        });
        post.save().
        then((result)=>{
            res.status(201).json({message:'Post Created Successfully',post:result});
        })  
        .catch((err)=>{ 
            console.log(err);
            res.status(400).json({error:'Failed to Create Post'});
        })
    }
});

router.get('/all-posts',(req,res)=>{
    Post.find()
    .populate('postedBy',"_id name")
    .then((posts)=>{
        res.status(200).json({posts:posts});
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).json({error:'Error while fetching all posts'});
    });
});

router.get('/my-posts',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then((myPost)=>{
        res.status(200).json({post:myPost});
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).json({error:'Error fetching Posts'});
    });
});

module.exports= router;