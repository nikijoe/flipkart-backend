const express = require('express')

const {addItemToCart, getCartItems, removeCartItems} = require('../controllers/cart')
const {userMiddleware, requireSignin} = require('../common-middleware')

const router = express.Router()

router.post('/user/cart/addtocart', requireSignin, userMiddleware, addItemToCart)
router.post('/user/cart/getCartItems', requireSignin, userMiddleware, getCartItems)
router.post('/user/cart/removeItem', requireSignin, userMiddleware, removeCartItems)


module.exports = router