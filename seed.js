const { db, User, Puppy, Kitten, Secret } = require('./server/db')

const seed = async () => {
    try {
        await db.sync({force: true})
        await User.create({name: 'Mama Bear', email: 's@aol.com', password: '123'})
        await User.create({name: 'x', email: 'x@gmail.com', password: '123'})
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