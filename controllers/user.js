const jwt = require('jsonwebtoken');

const { promisify } = require('util');
const asyncSign = promisify(jwt.sign);

const User = require('../models/User');

const create = (user) => {
   return User.create(user);
}

const  login = async ({ username, password }) => {
    //get user from DB
    const user = await User.findOne({ username }).exec();
    if(!user){
        throw Error('UN_AUTHENTICATED')
    }
    //match input password with user data use bycrypt
    const isValidPass = await user.validatePassword(password);
    if(!isValidPass){
        throw Error('UN_AUTHENTICATED');
    }
    const token = await asyncSign({
        username: user.username,
        id: user.id,
      }, '**//**//**', { expiresIn: '1d' });
      return { ...user.toJSON(), token };
    };


const getAll = () => {
    return User.find({}).exec();
}

const getById = (id) => {
    return User.findById(id).exec();
}

const editById = (id, body) => {
    return User.findByIdAndUpdate(id, body, {new: true}).exec();
}

const deleteById = (id) => {
    return User.findByIdAndDelete(id).exec();
}

const pushfollowID = async (username, targetId) =>{
    const loggedUser = await User.findOne({username}).exec();
    if(targetId != username && !loggedUser.following.find(item => item == targetId)){
        User.updateOne({username}, {$push :{following: targetId}}, {new:true}).exec();
        User.updateOne({username:targetId}, {$push: { followers: username}}, {new:true}).exec();
        return {"status":"followed"};
    }else{
        throw new Error("ID_invalid");
    }
}

const pullfollowID = (username, targetId) =>{
    User.updateOne({username}, {$pull :{following: targetId}}, {new:true}).exec();
    User.updateOne({username:targetId}, {$pull: { followers: username}}, {new:true}).exec();
    return {"status":"unfollowed"};
}

const searchUser = (username)=>{
    return User.find({username}).exec();
}

const searchFname = (firstName)=>{
    return User.find({firstName}).exec();
}

module.exports ={
    create,
    login,
    getAll,
    getById,
    editById,
    deleteById,
    pushfollowID,
    pullfollowID,
    searchUser,
    searchFname
};