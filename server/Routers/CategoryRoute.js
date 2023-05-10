// <<<<<<< HEAD
// const route = require('express').Router();
// const {Category} = require('../Models/Category');
// route.post('/',(req,res,next)=>{
//     Category.create({name:req.body.name, description:req.body.description})
//         .then((cat)=>res.status(200).send(cat))
//         .catch((err)=>res.status(400).json({error:err}));
// })
// route.get('/',(req,res,next)=>{
//     Category.find()
//         .then((cat)=>res.status(200).json(cat))
//         .catch((err)=>res.status(400).json({error:err}));
// })
//
// module.exports = route;
// =======

const route = require('express').Router();
const {Category} = require('../Models/Category');
const Cat= require('../Models/Category');


route.post('/',(req,res,next)=>{
  console.log("cat");
    Category.create({name:req.body.name, description:req.body.description})
        .then((cat)=>res.status(200).send(cat))
        .catch((err)=>res.status(400).json({error:err}));
})

route.delete('/:id', (req, res) => {
    const catId = req.params.id;
  
    Cat.deleteCategory(catId)
      .then(() => {
        res.status(200).json({
          success: true,
          message: 'Category deleted successfully'
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: 'Failed to delete category ',
          error: err.message
        });
      });
  });

  route.put('/:id',(req,res,next)=>{
   
    Cat.updateCategory(req.params.id,req.body.name, req.body.description)
        .then((cat)=>res.status(200).json({
          cat:cat,
          msg:'category updated successfully'
        }))
        .catch((err)=>res.status(400).json({error:err}));
  });

  route.get('/', (req, res, next) => {
    Cat.getAll()
      .then((cats) => res.status(200).json({ cats: cats }))
      .catch((err) => res.status(400).json({ error: err }));
  });
  
  route.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Cat.getById(id)
      .then((cats) => res.status(200).json({ cats: cats }))
      .catch((err) => res.status(400).json({ error: err }));
  });


module.exports = route;
