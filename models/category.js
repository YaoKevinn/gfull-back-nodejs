const { Schema, model } = require("mongoose");
const CategorySchema = Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
});

CategorySchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.cid = _id;
    return object;
});

module.exports = model("Category", CategorySchema);
