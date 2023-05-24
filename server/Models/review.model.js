let mongoose = require('mongoose');

let reviewSchema = mongoose.Schema({
    name: { type: String, required: true },
    reviewText: { type: String, required: true },
    email: { type: String, required: true },
    rating: { type: Number, required: true },
    productId: { type: String, required: true },
    CreatedAt: { type: String, default: Date.now() }
});

module.exports = mongoose.model('Review', reviewSchema);