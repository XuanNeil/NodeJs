const Product = require('../models/model.product');
const mongoose = require('mongoose');


exports.getAllProduct = (req, res, next) => {
    // res.status(200).json({message: 'Handing Get req'})
    Product.find()
    .select("name price _id productImage")
    .exec()
    .then(doc => {
        const response = {
            status: res.statusCode,
            count: doc.length,
            message: "",
            products: doc.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    productImage: doc.productImage,
                    urlImage: 'http://localhost:3000/' + doc.productImage,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/products/" + doc._id
                    }
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

exports.createProduct = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
         price: req.body.price,
         productImage: req.file.path
    })
     product.save()
     .then( result => {
         console.log(result);
         res.status(201).json({
             status: res.statusCode,
             message: 'Tạo thành công',
             createProduct: {
                 name: result.name,
                 price: result.price,
                 _id: result._id,
                 productImage: result.productImage,
                 urlImage:  "http://localhost:3000/" + result.productImage,
                 request: {
                     type: 'GET',
                     url: "http://localhost:3000/products/" + result._id,   
                 }
             }
         })
     })
     .catch(err => {
         console.log(err);
         res.status(500).json({
             error: err
         })
     });
 }

 exports.getDetailProduct = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .select('name, price, _id productImage')
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products'
                }
            });
        } else {
            res.status(404).json({message: 'No valid entry...'})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
    res
}

exports.updateProduct = (req, res, next) => {
    const id = req.params.productId;
    const updateOpts = {};
    Product.findByIdAndUpdate({_id: id},  {name: req.body.name, price: req.body.price} )
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Update thanh cong',
            url: 'http://localhost:3000/products' + id
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }) 
}

exports.deleteProduct = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    })
}