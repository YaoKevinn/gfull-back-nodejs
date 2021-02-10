const fs = require('fs');

const Product = require('../models/product');

const borrarImagen = (path) => {
    if (fs.existsSync(path)){
        // borrar imagen vieja
        fs.unlinkSync(path);
    }
}



const actualizarImagen = async (tipo, id, nombreArchivo) => {

    let pathViejo = '';

    switch (tipo) {
        case 'products':
            const product = await Product.findById(id);
            if ( !product ){
                console.log('No es un product por id!');
                return false;
            }
            pathViejo = `./uploads/products/${product.image}`;
            borrarImagen(pathViejo);
            product.image = nombreArchivo;
            await product.save();
            return true;
        default:
            break;
    }
}

module.exports = {
    actualizarImagen,
    borrarImagen
}