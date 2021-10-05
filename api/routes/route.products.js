
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/model.product');
const multer = require('multer');
const checkAuth = require('../middlewares/check-auth');

const controllerProducts = require('../controllers/getAllProduct.controllers');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }else{
        cb(null, false);
    }  
}
const upload = multer({
   storage: storage,
   limits: {
       fileSize: 1024 * 1024 * 2
   },
   fileFilter: fileFilter
})


router.get('/', controllerProducts.getAllProduct);

router.post('/', checkAuth, upload.single('productImage'), controllerProducts.createProduct);

router.get('/:productId', controllerProducts.getDetailProduct);

router.post('/:productId', checkAuth, controllerProducts.updateProduct);

router.delete('/:productId', controllerProducts.deleteProduct);

module.exports = router;