import { Router } from 'express'
import CartManager from '../dao/classes/MongoDB/CartManager.js';

const router = Router()

const cartManager = new CartManager();


router.post('/', async (req, res)=>{
    await cartManager.createCart()
    res.status(201).send('New Cart created')
})

router.get('/:cid', async (req, res)=>{
    const { cid } = req.params
    let cart = await cartManager.getCart(cid)
    res.status(201).send({products: cart.products})
})

router.put('/:cid/products/:pid', async (req, res)=>{
    const { cid, pid } = req.params
    const { quantity } = req.body
    let cart = await cartManager.addProductQuantity(cid, pid, quantity)
    res.status(201).send({
        "new cart": cart,
        "message": "Product added"
    })
})

router.put('/:cid', async (req,res)=> {
    const {cid} = req.params
    let array = req.body
    let cart = await cartManager.addProducts(cid, array)
    res.status(201).send({
        "new cart": cart,
        "message": "Products added"
    })
})

router.delete('/:cid/products/:pid', async (req, res)=> {
    const { cid, pid } = req.params
    let cart = await cartManager.deleteProduct(cid, pid)
    res.status(201).send({
        "new cart": cart,
        "message": "Product deleted"
    })
})

router.delete('/:cid', async (req, res)=> {
    const { cid } = req.params
    let cart = await cartManager.deleteCart(cid)
    res.status(201).send({
        "new cart": cart,
        "message": "Cart deleted"
    })
})

export default router