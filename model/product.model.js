const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title:{type:String,required:true},
    brand:{type:String,required:true},
    price:{type:Number,required:true},
    rating:{type:Number,required:true}
},{
    versionKey: false
})

const productModel = mongoose.model("product",productSchema)

module.exports = {productModel}