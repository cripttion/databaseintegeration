const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    albumId:{
        type:String
    },
    userId:{
        type:String
    },
    creationDate:{
        type:Date,
        default:Date.now()
    },
    showcase:{
        type:String
    },
    imageIds:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Image'
    }]
    
});
module.exports = mongoose.model('User',userSchema);
