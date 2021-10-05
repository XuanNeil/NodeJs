const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: String,
    productImage: String
});
const Product = mongoose.model('Product', productSchema, "User");
module.exports = Product;