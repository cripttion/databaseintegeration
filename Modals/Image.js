const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    imageName:{
        type:String
    },
    imageData:{
        type:Buffer,
        required:true
    },
    date_of_creation:{
        type:Date,
        default:Date.now
    },
    likeCount:{
        type:Number,
        default:0
    }
    
});
module.exports = mongoose.model('Image',ImageSchema);
