const Sequelize = require('sequelize');
const crypto = require('crypto')
const _ = require('lodash')
const db = new Sequelize('postgres://localhost/appy', {
  logging: false // unless you like the logs
  // ...and there are many other options you may want to play with
});


const Puppy = db.define('puppies', {
    name: {
        type: Sequelize.STRING,
    }
})

const Kitten = db.define('kittens', {
    name: {
        type: Sequelize.STRING
    }
})

const User = db.define('user', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING,
        get() {
            return function() {return this.getDataValue('password')}
        }
    },
    salt: {
        type: Sequelize.STRING,
        get() {
            return function() {return this.getDataValue('salt')}
        }
    },
    googleId: {
        type: Sequelize.STRING
    }

})

User.prototype.correctPassword = function (candidatePassword) {
    return this.Model.encryptPassword(candidatePassword,this.salt) === this.password
}

User.prototype.sanitize = function() {
    return _.omit(this.toJSON(), ['password', 'salt'])
}

User.generateSalt = function() {
    return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText,salt) {
    return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}
const setSaltAndPassword = (user) => {
    if(user.changed('password')) {
        user.salt = User.generateSalt();
        user.password = User.encryptPassword(user.password(), user.salt())
    }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)

User.hasMany(Kitten)
User.hasMany(Puppy)
Puppy.belongsTo(User)
Kitten.belongsTo(User)

module.exports = { Puppy, Kitten, User, db }