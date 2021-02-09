const mongoose = require('mongoose');

const { Schema } = mongoose;

const blogSchema = new Schema({
    title:{
        type: String,
        maxlength: 256,
        required: true,
    },
    body:{
        type: String,
        maxlength: 2000,
        required:true,
    },
    tags: [String],

    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comment:[String],
    
    photo: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type:Date,
        default: Date.now(),
    },
    likes:[{
        type: Schema.Types.ObjectId,
         ref: 'User'
       }],
});
 const blogModel = mongoose.model('Blog', blogSchema);
 module.exports = blogModel;