const express = require('express');
const router = express.Router();
const helper = require('../config/helper')
const dbQuery = require('../dbQuery/user')
const multer = require('multer');
const passport = require("passport");  

const upload = multer({ dest: 'upload/' });

router.post('/registers', async(req,res)=>{
    try {
        if (!req.body.email) return catchBlock("Enter valid email address", res, 0, {}, req.headers['requestby'])
        req.body.email = ((req.body.email).trim()).toLowerCase();

        let user = await dbQuery.getUser(req.body.email)
        if (user) return  res.status(200).json({status: 'User already exist'})

        req.body.password = await helper.encryptPassword(req.body.password)
        await dbQuery.createUser(req.body)
        return res.status(200).json({success: true})
        
    } catch (error) {
        console.log(error.message)
        return res.status(200).json({data: null,success: false})

        
    }
})
router.post('/login',async(req,res)=>{
    try {

        let user = await dbQuery.getUser(req.body.email)
			if (!user) return  res.status(200).json({success: false,message: 'email not found'})	
			const checkPassword = await helper.comparePassword(req.body.password, user.password)
			if (!checkPassword) return res.status(200).json({success: false,message: 'Incorrect password'})	
			const token = helper.createJwtToken({id: user.dataValues.id})
			return res.status(200).json({token: token,success: true})
        
    } catch (error) {
        return res.status(200).json({data: null,success: false})

    }
})

router.post('/likes',passport.authenticate("jwt", { session: false }), async(req,res)=>{
    try {
        const createLikeObj = {
            userId: req.user.id,
            toUserId: req.body.toUserId,
            likeStatus: req.body.likeStatus
        }

        const postLikes = await dbQuery.likes(createLikeObj)

        return res.status(200).json({status: true})
    } catch (error) {
        console.log(error.message)
        return res.status(200).json({data: null,success: false})

    }
})

router.post('/postComment',passport.authenticate("jwt",{session:false}), async(req,res)=>{
    try {
        const newComment = await comment.create({
            userId: req.user.id,
            toUserId : req.body.toUserId,
            comment: req.body.commentText
          });
          const postComment = await dbQuery.postComment(newComment)
          return res.status(201).json(newComment);

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})
router.post('/addFriendList',async()=>{
    try {

    } catch (error) {
        
    }
})


router.post('/postImage',passport.authenticate("jwt",{session:false}),async(req,res)=> {
    try {
            const postImageObject = {
                image: 'https://source.unsplash.com/user/c_v_r/1900x800',
                description: req.body.description,
                userId: req.user.id
            }
        const result = await dbQuery.imagePost(postImageObject)
        console.log(result.rows.dataValues)
        return res.status(200).json({data: result})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Server error' });
        
    }
})

router.get("/getAllPost",async(req,res)=> {
    try {

        const result = await dbQuery.getAllPost()
        console.log(result)
        
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
})
router.get('/getAllFriendList',async()=>{
    try {
        
    } catch (error) {
        
    }
})

router.get('/getLikes',passport.authenticate("jwt", { session: false }), async(req,res) => {
    try {

        
    } catch (error) {
        return res.status(200).json({data: null,success: false})
    }
})


module.exports = router;
