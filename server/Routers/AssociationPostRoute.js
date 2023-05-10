const express = require("express");
const {User} = require("../Models/User")
const {ArticleAssociation} = require("../Models/AssociationArticle")
// <<<<<<< HEAD
const {Product} = require("../Models/Produit")
const { protect } = require("../middleware/authmiddleware");
// =======
const { protectAssociation } = require("../middleware/authmiddleware");
const associationPost = require('../Models/AssociationArticle');

const router = express.Router();

router.route("/").post(protectAssociation, async (req, res)=>{
    const {
        title,
        description,
        quantity,
        category
    } = req.body;
    let newPost = {
        association:req.user._id,
        title:  title,
        description: description,
        quantity: quantity,
        restingQuantity: quantity,
        category:category
    }
    await ArticleAssociation.create(newPost).then((post)=>{
        console.log(post)
        res.send(post)
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

// Get 6 most recent posts
router.get('/recent_six', (req, res) => {
    ArticleAssociation.find({restingQuantity:{$ne:0}})
        .populate("association", "name")
        .populate("category", "name")
        .sort({ createdAt: -1 })
        .limit(6)
        .then(posts=>{
            // console.log(posts)
            res.send(posts)
        })
        .catch((err)=>{
            console.log(err)
            res.status(401)
        })
});

// Get 6 most recent posts
router.get('/by_cat/:cat', (req, res) => {
    ArticleAssociation.find({restingQuantity:{$ne:0}, category:req.params.cat})
        .populate("association", "name")
        .populate("category", "name")
        .sort({ createdAt: -1 })
        .limit(6)
        .then(posts=>{
            // console.log(posts)
            res.send(posts)
        })
        .catch((err)=>{
            console.log(err)
            res.status(401)
        })
});




// Get 6 most recent posts
router.get('/:id', (req, res) => {
    ArticleAssociation.findOne({_id:req.params.id})
        .populate("association", "name")
        .populate("category", "name")
        .then(posts=>{
            res.send(posts)
        })
        .catch((err)=>{
            console.log(err)
            res.status(401)
        })
});




// Get 6 most recent posts
router.put('/', protect, (req, res) => {
    const {postId, productId, donated} = req.body
    console.log(postId)
    console.log(productId)
    console.log(donated)
    ArticleAssociation.findOne({_id:postId})
        // .populate("association", "name")
        // .populate("category", "name")
        .then(post=>{
            console.log("post")
            post.restingQuantity-=donated
            post.save()
            Product.findOne({_id:productId}).then((product)=>{
                console.log("product")
                console.log(product)
                product.stock-=donated
                product.save()
                res.send(product)
            })
        })
        .catch((err)=>{
            console.log(err)
            res.status(401)
        })
});



// Get 6 most recent posts
router.get('/del/:id', protectAssociation,async (req, res) => {
    try {
        console.log(req.params.id)
        await ArticleAssociation.findOne({_id:req.params.id}).then((art)=>{
            console.log(art)
        })
        // ArticleAssociation.deleteOne({_id:req.params.id}).then(()=>{
        //     console.log("deleted")
        // })

        // const posts = ArticleAssociation.find({
        //     association:req.user.id
        // })
        // res.send(posts);
    } catch (err) {
        console.error(err);
    }

});

// all posts by current user
router.get('/', protectAssociation, (req, res) => {
    console.log("posts")

    ArticleAssociation.find({ association: req.user.id })
        .populate("category", "name")
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

router.delete('/:id', (req, res) => {
    const articleId = req.params.id;
  
    ArticleAssociation.deleteArticle(articleId)
      .then(() => {
        res.status(200).json({
          success: true,
          message: 'Article deleted successfully'
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: 'Failed to delete article',
          error: err.message
        });
      });
  });


  router.get('/count/associationPost',(req,res,next)=>{
    associationPost.getAllAssociationsPostCount()
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
  })
  





module.exports = router;
