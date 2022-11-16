const Usuario = require('../models/userModel');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            //Verifica usuario por email
            Usuario.findOne({ email: email })
                .then((user) => {
                    if (!user) { //Evalúa si el usuario no esta registrado en la bd
                        return done(null, false, { message: 'El correo electrónico no se encuentra registrado' }); //Si es verdad muestra mensaje
                    }
                    //Compara si la contraseña ingresada coincide con la contraseña en la bd
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) { //Evalúa si las contraseñas coinciden
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'La contraseña  es incorrecta' }); //Si es falso muestra mensaje de error
                        }
                    })
                })
                .catch((err) => { console.log(err) }) //Muestra mensaje de error en consola
        })
    )
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    })
    passport.deserializeUser(function (id, done) {
        Usuario.findById(id, function (err, user) {
            done(err, user);
        })
    })
}
