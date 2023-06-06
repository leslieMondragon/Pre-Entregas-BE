import { Router } from "express";
import ProductRouter from "./products.js"
import CartRouter from "./carts.js"
import Auth from "./auth.js"
import auth from "../middleware/auth.js";
import SessionRouter from "./sessions.js"

const router = Router()

router.use('/api/products', ProductRouter)
router.use('/api/carts', CartRouter)
router.use('/auth', Auth)
router.use('/api/sessions', SessionRouter)
export default router