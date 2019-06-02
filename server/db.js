const Sequelize = require('sequelize');

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

const User = db.define('users', {
    name: {
        type: Sequelize.STRING
    }
})

User.hasMany(Kitten)
User.hasMany(Puppy)
Puppy.belongsTo(User)
Kitten.belongsTo(User)

module.exports = { Puppy, Kitten, User, db }