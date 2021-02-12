const Blog = require('../models/Blog');

const upload = (blog)=>{
    return Blog.create(blog);
}

const create = (blog)=>{
   return Blog.create(blog);
};

const createBlog = (blog) =>{
    return  Blog.create(blog);
}


const getMyblog = (query) => {
    return Blog.find(query).exec();
}

const getAll = () => {
    return Blog.find({}).exec();
}

const getById = (id) => {
    return Blog.findById(id).exec();
}

const editById = (id, editid, body) => {
    return Blog.updateOne({ $and: [{_id:editid}, { author:id }]}, { $set:body });
}

const deleteById = (id, deletedid) => {
    return Blog.find({$and:[{_id:deletedid}, {author:id}]}).remove();
}

const getByTitle=(title)=>{
   
    return Blog.find({title}).exec();
}

const getByTag=(tags) =>{
    return Blog.find({tags}).exec();
}


const like = (id, lid) => Blog.findByIdAndUpdate( lid, { $push: { likes:id } },{ new: true, useFindAndModify: false }).exec();

const unlike = (id, lid) => {
    Blog.findByIdAndUpdate( lid, { $pull: { likes:id } },{ new: true, useFindAndModify: false }).exec();
    return {"status":"unliked"};
}

// const addComment=(body, id, blogId) =>Blog.updateOne( {_id : blogId},{ $addToSet: {comments: { commentId: author, comment: comment } } },{ new: true, useFindAndModify: false }).exec();

const addComment = (body)=>{
    return Blog.create(body);
}

module.exports = {
    upload,
    create,
    createBlog, 
    getMyblog,
    getAll,
    getById,
    editById,
    deleteById,
    getByTitle,
    getByTag,
    like,
    unlike,
    addComment
}