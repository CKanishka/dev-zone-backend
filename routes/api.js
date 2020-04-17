const express=require('express');
const router=express.Router();

const Item=require('../models/Item');
const UserAuth=require('../models/UserAuth');

/********* USER AUTHENTICATION and REGISTRATION *****************/
router.post('/register', function(req, res) {
    const { name,email, password } = req.body;
    const user = new UserAuth({ name, email, password });
    user.save(function(err) {
      if (err) {
        res.status(500).send("Error registering new user please try again.");
      } else {
        res.status(200).json({name});
      }
    });
  });

router.post('/authenticate', function(req, res) {
const { email, password } = req.body;
UserAuth.findOne({ email }, function(err, user) {
    if (err) {
    console.error(err);
    res.status(500)
        .json({
        error: 'Internal error please try again'
    });
    } else if (!user) {
    res.status(401)
        .json({
        error: 'Incorrect email or password'
        });
    } else {
    user.isCorrectPassword(password, function(err, same) {
        if (err) {
        res.status(500)
            .json({
            error: 'Internal error please try again'
        });
        } else if (!same) {
        res.status(401)
            .json({
            error: 'Incorrect email or password'
        });
        } else {
        res.status(200).json({name:user.name});
        }
    });
    }
});
});

/********* BLOG ITEMS CREATE, READ, UPDATE *****************/
//'Get' request to show all items
router.get('/',(req,res)=>{
    Item.find()
        .sort({date: -1})
        .then((items)=>res.json(items));  //responding back with the items
});

//'Post' request to add a new item
router.post('/',(req,res)=>{
    const newItem=new Item({
        name:req.body.name,               //extracting name from the body of the request   
        title:req.body.title,
        content:req.body.content,
        likecount:0
    });
    newItem.save().then((item)=>res.json(item));
})

//'Put' request to edit an item
router.put('/:id',(req,res)=>{
    const newItem=new Item({
        name:req.body.name,               //extracting name from the body of the request
        title:req.body.title,
        content:req.body.content,
    });
    console.log(newItem)
    Item.findById(req.params.id) 
        .then((item)=>item.updateOne({name:req.body.name,title:req.body.title,
            content:req.body.content,likecount:req.body.likecount+1}).then((items)=>res.json(items)))  
})

module.exports=router;