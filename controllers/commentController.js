
const express = require('express');
var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Usuario = require("../models/userModel.js");
const Publicacion = require("../models/publicationModel.js");
const Comentario = require("../models/commentModel.js");
const titles = require('../config/titles');

const multer = require('multer');
const fs = require('fs');
const path = require('path');


module.exports = {

    //Crear comentario
    createComment: async (req, res) => {
        console.log(req.body);
        const comentario = new Comentario(req.body);
        await comentario.save();
        req.flash('success_msg', 'Comentario publicado');
        res.redirect('/users/home');
    },

};

