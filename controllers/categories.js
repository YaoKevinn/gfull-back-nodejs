/*
    /api/categories
*/
const Category = require("../models/category");

const getCategories = async (req, res) => {
    const categories = await Category.find();
    try {
        res.json({
            ok: true,
            categories,
        });
    } catch (error) {
        console.log("Error en getCategories", error);
        res.status(500).json({
            ok: false,
            msg: "Error en getCategories.",
        });
    }
};

const crearCategory = async (req, res = response) => {

    const category = new Category(req.body); 

    await category.save();
    res.json({
        ok: true,
        category
    });
};

const actualizarCategory = async (req, res = response) => {

    const uid = req.params.id;

    try {
        const categoryDB = Category.findById(uid);
        if (!categoryDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un category por ese id",
            });
        }
        // Actualizaciones
        const { ...campos } = req.body;
        const categoryActualizado = await Category.findByIdAndUpdate(
            uid,
            campos,
            { new: true }
        );
        res.json({
            ok: true,
            uid: uid,
            category: categoryActualizado,
        });
    } catch (error) {
        console.log("Error en actualizar Category.", error);
        res.status(500).json({
            ok: false,
            msg: "Error en actualizar Category.",
        });
    }
};

const borrarCategory = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const categoryDB = Category.findById(uid);
        if (!categoryDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un category por ese id",
            });
        }
        await Category.findOneAndDelete(uid);
        res.json({
            ok: true,
            msg: "Category eliminado!",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error en eliminar categoryo",
        });
    }
};

module.exports = {
    getCategories,
    crearCategory,
    actualizarCategory,
    borrarCategory,
};
