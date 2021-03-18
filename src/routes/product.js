const express = require('express')
const multer = require('multer')
const shortid = require('shortid')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
const upload = multer({storage})

const {addProduct, getProductsBySlug, getProductDetailsById, deleteProductById, getProducts} = require('../controllers/product')
const {adminMiddleware, requireSignin} = require('../common-middleware')

const router = express.Router()

router.post('/product/create', requireSignin, adminMiddleware, 
            upload.array('productPictures'), addProduct)
router.get('/products/:slug', getProductsBySlug)
router.get('/product/:productId', getProductDetailsById)
router.delete('/product/deleteProductById', requireSignin, adminMiddleware, deleteProductById)
router.post('/product/getProducts', requireSignin, adminMiddleware, getProducts)
module.exports = router
