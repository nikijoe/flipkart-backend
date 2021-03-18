const express = require('express')
const {requireSignIn, adminMiddleware, requireSignin} = require('../../common-middleware')
const { updateOrder, getCustomerOrders } = require('../../controllers/admin/order')
const router = express.Router()

router.post('/order/update', requireSignin, adminMiddleware, updateOrder)
router.post('/order/getCustomerOrders', requireSignin, adminMiddleware, getCustomerOrders)

module.exports = router