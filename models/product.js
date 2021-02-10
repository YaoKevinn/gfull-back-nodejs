const { Schema, model } = require("mongoose");
const ProductSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    unit: {
        type: String,
        required: true,
    },
    unitPrice: {
        type: Number,
    },
    category: {
        type: String,
        required: true,
    },
    hotSaleType:{
        type: Number,
        required: true,
        default: 1,
    },
    disponibility: {
        type: Boolean,
        required: true,
        default: true,
    },
    originalPrice: {
        type: Number,
    },
    discountUnit: {
        type: Number,
    },
    discountPrice: {
        type: Number,
    },
    discountUnit2: {
        type: Number,
    },
    discountPrice2: {
        type: Number,
    },
    discountUnit3: {
        type: Number,
    },
    discountPrice3: {
        type: Number,
    },
});

ProductSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.pid = _id;
    return object;
});

module.exports = model("Product", ProductSchema);
