const ProductManager = require('../src/productManager');
const CartManager = require('../src/cartManager');

const path = require('path');
const pathProd = path.join(`${__dirname}/../db/items.json`);

let myCartManager = new CartManager();
let myProductManager= new ProductManager(pathProd);

const createCart = async (req, res)=>{
    const cart = {
        products: []
    }
    myCartManager.addCart(cart);
    res.status(200).send('cart created');
};

const getCartId = async (req, res)=>{
    const cid = req.params.cid;
    const carts = await myCartManager.getCarts();
    console.log('carts', carts);
    let cart = carts.find((c) => c.id === Number(cid));
    if(cart){
        res.status(200).send(cart);
    }else{
        res.status(404).send(`Error: cart not found with id: ${cid}`);
    };
};

const getProductsByIdCart = async (req,res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    let cart = await myCartManager.getCartById(Number(cid));
    let product = await myProductManager.getProductById(Number(pid));
    const productAdd = {
        id: product.id,
        quantity: 1
    };
    myCartManager.addToCart(cart, productAdd);
    res.status(200).send('Product added to cart');
};

module.exports = {
    createCart,
    getCartId,
    getProductsByIdCart};