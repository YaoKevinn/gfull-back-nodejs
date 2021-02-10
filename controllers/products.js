/*
    /api/products
*/
const fs = require("fs");
const Product = require("../models/product");

const getProducts = async (req, res) => {
    const products = await Product.find();
    try {
        res.json({
            ok: true,
            products,
        });
    } catch (error) {
        console.log("Error en getProducts", error);
        res.status(500).json({
            ok: false,
            msg: "Error en getProducts.",
        });
    }
};

const crearProduct = async (req, res = response) => {

    const product = new Product(req.body); 

    await product.save();
    res.json({
        ok: true,
        product
    });
};

const actualizarProduct = async (req, res = response) => {

    const pid = req.params.id;

    try {
        const productDB = Product.findById(pid);
        if (!productDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un producto por ese id",
            });
        }
        // Actualizaciones
        const { ...campos } = req.body;
        const productActualizado = await Product.findByIdAndUpdate(
            pid,
            campos,
            { new: true }
        );
        res.json({
            ok: true,
            pid: pid,
            product: productActualizado,
        });
    } catch (error) {
        console.log("Error en actualizar Product.", error);
        res.status(500).json({
            ok: false,
            msg: "Error en actualizar Product.",
        });
    }
};

const borrarProduct = async (req, res = response) => {
    const pid = req.params.id;
    const image = req.params.image;
    try {
        const productDB = Product.findById(pid);

        if (!productDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un product por ese id",
            });
        }
        imagePath = `./uploads/products/${image}`;
        if (fs.existsSync(imagePath)){
            fs.unlinkSync(imagePath);
        }
        await Product.findOneAndDelete(pid);
        res.json({
            ok: true,
            msg: "Product eliminado!",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error en eliminar producto",
        });
    }
};

module.exports = {
    getProducts,
    crearProduct,
    actualizarProduct,
    borrarProduct,
};
