const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema({
    username :{
        type: String,
        unique: true,
        required:true,
        maxlength: 140,
    },

    password:{
        type: String,
        required:true,
    },

    firstName:{
        type: String,
        maxlength: 140,
    },

    LastName:{
      type: String,
      maxlength: 140,
    },

    Email:{
      type:String,
      required:true,
    },

    followers:[{
       type: Schema.Types.ObjectId,
        ref: 'User'
      }],

    following:[{ 
       type: Schema.Types.ObjectId, 
        ref: 'User'
      }],
    dob: Date,
},
{
    toJSON: {
        transform: (doc, ret, options) => {
          delete ret.password;
          return ret;
        },
     },
});
userSchema.pre('save', function preSave(next) {
    this.password = bcrypt.hashSync(this.password, 8);
    next();
  });
  userSchema.pre('findOneAndUpdate', function preSave(next) {
    if (!this._update.password) {
      return;
    }
    this._update.password = bcrypt.hashSync(this._update.password, 8);
    next();
  });
  
  userSchema.methods.validatePassword = function validatePassword(password) {
    return bcrypt.compareSync(password, this.password);
  };



const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
