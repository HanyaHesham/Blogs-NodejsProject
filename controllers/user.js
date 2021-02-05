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

//  const logout = (id) => {
    
//     }

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

const pushfollowID = async (id, targetId) =>{
    const loggedUser = await User.findById(id).exec();
    if(targetId != id && !loggedUser.following.find(item => item == targetId)){
        User.updateOne({_id:id}, {$push :{followers: targetId}}, {new:true}).exec();
        User.updateOne({_id:targetId}, {$push: { following: id}}, {new:true}).exec();
        return {"status":"followed"};
    }else{
        throw new Error("ID_invalid");
    }
}

const pullfollowID = (id, targetId) =>{
    User.updateOne({_id:id}, {$pull :{followers: targetId}}, {new:true}).exec();
    User.updateOne({_id:targetId}, {$pull: { following: id}}, {new:true}).exec();
    return {"status":"unfollowed"};
}

module.exports ={
    create,
    login,
    logout,
    getAll,
    getById,
    editById,
    deleteById,
    pushfollowID,
    pullfollowID,
};