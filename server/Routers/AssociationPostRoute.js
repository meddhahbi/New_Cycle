const express = require("express");
const {User} = require("../Models/User")
const {ArticleAssociation} = require("../Models/AssociationArticle")
const { protectAssociation } = require("../middleware/authmiddleware");

const router = express.Router();

router.route("/").post(protectAssociation, async (req, res)=>{
    const {
        title,
        description,
        quantity
    } = req.body;
    let newPost = {
        association:req.user._id,
        title:  title,
        description: description,
        quantity: quantity,
        restingQuantity: quantity
    }
    await ArticleAssociation.create(newPost).then((post)=>{
        console.log(post)
        res.status(post)
    })
})

// Get 5 most recent posts by current user
router.get('/my-recent-posts', protectAssociation, (req, res) => {
    ArticleAssociation.find({ association: req.user.id })
        .sort({ createdAt: -1 })
        .limit(5)
        .then(posts=>{
            // console.log(posts)
            res.send(posts)
        })
        .catch((err)=>{
            console.log(err)
            res.status(401)
        })
});

// Get 5 most recent posts by current user
router.get('/my-all-posts', protectAssociation, (req, res) => {


    ArticleAssociation.find({ association: req.user.id })
        .sort({ createdAt: -1 })
        .then(posts=>{
            // console.log(posts)
            res.send(posts)
        })
        .catch((err)=>{
            console.log(err)
            res.status(401)
        })
});


module.exports = router;