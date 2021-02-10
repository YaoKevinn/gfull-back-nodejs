/*
   Ruta:/api/categories
*/
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");
const { Router } = require("express");

const {
    getCategories,
    crearCategory,
    actualizarCategory,
    borrarCategory
} = require("../controllers/categories");

const router = Router();

router.get("/", validarJWT, getCategories);
router.post(
    "/",
    [
        [
            validarJWT,
            check("name", "El nombre es oblogatorio").not().isEmpty(),
            check("id", "El id es oblogatorio").not().isEmpty(),
            validarCampos,
        ],
    ],
    crearCategory
);
router.put(
    "/:id",
    [
        validarJWT,
        check("name", "El nombre es oblogatorio").not().isEmpty(),
        check("id", "El id es oblogatorio").not().isEmpty(),
        validarCampos,
    ],

    // importar la funcion al inicio del archivo
    actualizarCategory
);
router.delete("/:id", validarJWT, borrarCategory);

module.exports = router;
