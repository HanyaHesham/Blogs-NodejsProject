const mongoose = require('mongoose');

const { Schema } = mongoose;

const blogSchema = new Schema({
    title:{
        type: String,
        maxlength: 256,
        required: true
    },
    body:{
        type: String,
        maxlength: 2000,
    },
    tags: [String],
    createdAt:Date,
    updatedAt: Date,

    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    photo: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type:Date,
        default: Date.now(),
    }
});
 const blogModel = mongoose.model('Blog', blogSchema);
 module.exports = blogModel;