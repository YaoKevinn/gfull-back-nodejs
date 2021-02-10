/*
Aquientralalogicadelosapis
*/
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find();
    res.json({
        ok: true,
        usuarios,
    });
};

const crearUsuario = async (req, res = response) => {
    const { email, password, nombre } = req.body;
    try {
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "El correo ya esta registrado",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar",
        });
    }
    const usuario = new Usuario(req.body); // Encryptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt); // Guardar usuario
    const token = await generarJWT(usuario.id);
    await usuario.save();
    res.json({
        ok: true,
        usuario,
        token
    });
};

const actualizarUsuario = async(req, res = response) => {
        // TODO Validar Token y comprobar si es usuario correcto
        const uid = req.params.id;
        try { 
            const usuarioDB = Usuario.findById(uid);
            if ( !usuarioDB ) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe un usuario por ese id'
                });
            }
            // Actualizaciones
            const { password, google, email, ...campos} = req.body;
            campos.email = email;
            const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });
            res.json({
                ok: true,
                uid: uid,
                usuario: usuarioActualizado
            })
        } catch(error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error inesperado...'
            })
        }
    }

    const borrarUsuario = async(req, res = response) => {
            const uid = req.params.id;
            try {
                const usuarioDB = Usuario.findById(uid);
                if ( !usuarioDB ) {
                    return res.status(404).json({
                        ok: false,
                        msg: 'No existe un usuario por ese id'
                    });
                }
                await Usuario.findOneAndDelete(uid)
                res.json({
                    ok: true,
                    msg: 'Usuario eliminado!'
                })
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    ok: false,
                    msg: 'Hable con su administrador'
                })
            }
        }
        
    

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
};
