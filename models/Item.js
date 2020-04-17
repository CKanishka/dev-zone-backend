//Create a model for our database
const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const itemSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    content:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    likecount:{
        type:Number,
        required:true
    }
    
})

module.exports=Item=mongoose.model('item',itemSchema);