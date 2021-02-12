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

    // comments: [{
    //     commentId: {
    //         type: Schema.Types.ObjectId,
    //         ref: 'User'
    //     },
    //     comment: {
    //         type: String,
    //         maxlength: 500         
    //     },
    //     createdAt: {
    //         type: Date,
    //         default: Date.now
    //     },
    //     reply: [{
    //         replyId: {
    //             type: Schema.Types.ObjectId,
    //             ref: 'User'
    //         },
    //         reply: {
    //             type: String,
    //             maxlength: 500
    //         },
    //         createdAt: {
    //             type: Date,
    //             default: Date.now()
    //         },
    //     }],
    // }],
    
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