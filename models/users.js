const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// mongoDB schema for users
const user = new schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        min: 6,
        max: 15
    },
    password: {
        type: String,
        required: true
    },
    collections: [{type: mongoose.Schema.Types.ObjectID, ref: 'Collections'}]
});

// make sure the password is hashed before saving the data to database
user.pre('save', function(next) {
   if (!this.isModified('password')) {
       return next();
   }
   // if the password is not hashed, hash it
   bcrypt.hash(this.password, 10, (err, passwordHash) => {
      if (err) {
          return next(err);
      }
      this.password = passwordHash;
      next();
   });
});

// compare input password with the hashed password
user.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return callback(err);
        } else {
            // password does not mach
            if (!isMatch) {
                return callback(null, isMatch);
            }
            // password is matched
            return callback(null, this);
        }
    });
};

const User = mongoose.model('Users', user);
module.exports = User;