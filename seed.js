const { db, User, Puppy, Kitten } = require('./server/db')

const seed = async () => {
    try {
        await db.sync({force: true})
        await User.create({name: 'Mama Bear'})
        await Puppy.create({name: 'Sparky'})
        await Kitten.create({name: 'Fuerza'})
        console.log('seed success!')
        db.close()
    } catch (err) {
        console.log(err, 'it didnt work')
        console.log(err.stack)
        db.close()
    }
}

seed()