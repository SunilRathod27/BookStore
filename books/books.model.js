const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    book_name: { type: String, unique: true, required: true },
    book_price: { type: String, required: true },
    author_name: { type: String, required: true },
    created_by: { type: Schema.Types.ObjectId, ref: 'users' },
    created_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('books', schema);