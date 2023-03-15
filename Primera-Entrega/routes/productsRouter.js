const {Router} = require('express');
const productsRouter = Router();

const {
    getAllProducts,
    getProdById,
    addProduct,
    updateProductById,
    deleteProdById,
    }= require('../controllers/prodsController.js');

productsRouter.get('/', getAllProducts);
productsRouter.get('/:pid', getProdById);

productsRouter.post('/', addProduct);
productsRouter.put('/:pid', updateProductById);
productsRouter.delete('/:pid', deleteProdById);

module.exports = productsRouter;