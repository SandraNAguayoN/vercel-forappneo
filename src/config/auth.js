module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        //Mensaje de error cuando se intenta acceder al perfil sin haber inciado sesión previamente
        req.flash('error_msg', 'Para ver y acceder al contenido inicia sesión, sino tienes cuenta registrate.');
        //Redirige a la vista para que el usuario inicie sesión
        res.redirect('/login');
    }
}