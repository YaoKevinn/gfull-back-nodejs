/*
   Ruta:/api/usuarios
*/
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");
const { Router } = require("express");
const {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
} = require("../controllers/usuarios");
const router = Router();

router.get("/", validarJWT, getUsuarios);
router.post(
    "/",
    [
        [
            validarJWT,
            check("name", "El nombre es oblogatorio").not().isEmpty(),
            check("password", "El password es oblogatorio").not().isEmpty(),
            check("email", "El email es oblogatorio").isEmail(),
            validarCampos,
        ],
    ],
    crearUsuario
);
router.put(
    "/:id",
    [
        validarJWT,
        check("nombre", "El nombre es oblogatorio").not().isEmpty(),
        check("email", "El email es oblogatorio").isEmail(),
        check("role", "El role es oblogatorio").not().isEmpty(),
        validarCampos,
    ],

    // importar la funcion al inicio del archivo
    actualizarUsuario
);
router.delete("/:id", validarJWT, borrarUsuario);

module.exports = router;
