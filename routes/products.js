/*
   Ruta:/api/products
*/
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");
const { Router } = require("express");

const {
    getProducts,
    crearProduct,
    actualizarProduct,
    borrarProduct
} = require("../controllers/products");

const router = Router();

router.get("/", validarJWT, getProducts);
router.post(
    "/",
    [
        [
            validarJWT,
            check("name", "El nombre es oblogatorio").not().isEmpty(),
            check("code", "El codigo es oblogatorio").not().isEmpty(),
            check("description", "El description es oblogatorio").not().isEmpty(),
            check("unit", "El unit es oblogatorio").not().isEmpty(),
            check("category", "El category es oblogatorio").not().isEmpty(),
            check("hotSaleType", "El hotSaleType es oblogatorio").not().isEmpty(),
            check("disponibility", "El disponibility es oblogatorio").not().isEmpty(),
            validarCampos,
        ],
    ],
    crearProduct
);
router.put(
    "/:id",
    [
        validarJWT,
        check("name", "El nombre es oblogatorio").not().isEmpty(),
        check("code", "El codigo es oblogatorio").not().isEmpty(),
        check("description", "El description es oblogatorio").not().isEmpty(),
        check("unit", "El unit es oblogatorio").not().isEmpty(),
        check("category", "El category es oblogatorio").not().isEmpty(),
        check("hotSaleType", "El hotSaleType es oblogatorio").not().isEmpty(),
        check("disponibility", "El disponibility es oblogatorio").not().isEmpty(),
        validarCampos,
    ],

    // importar la funcion al inicio del archivo
    actualizarProduct
);
router.delete("/:id/:image", validarJWT, borrarProduct);

module.exports = router;
