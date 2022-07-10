const config = require('../config.json');
const db = require('../_helpers/db');
const User = db.User;
const Books = db.Books;
console.log("Book........",Books);
module.exports = {
    getAllBooks,
    getById,
    createBook,
    getBookByAuthor,
    update,
    delete: _delete
};


async function getAllBooks() {
    let page = 1
    let limit = 10
    return await Books.find().skip((page-1)*limit).select('_id').limit(limit);
}






async function getById(id) {
    return await Books.find(id);
}

async function createBook(data) {
 if (await Books.findOne({ book_name: data.book_name })) {
    throw 'BookName "' + data.book_name + '" is already taken';
}
const book = new Books(data);
// save book
await book.save();

    
}

async function getBookByAuthor(data) {
    return await Books.findOne(data);
}
async function update(id, data) {
    const book = await Books.findById(id);

    // validate
    if (!book) throw 'Book not found';
    if (book.book_name !== data.book_name && await Books.findOne({ book_name: data.book_name })) {
        throw 'BookName "' + data.book_name + '" is already taken';
    }
    // copy data properties to book
    Object.assign(book, data);

    await book.save();
}

async function _delete(id) {
    await Books.findByIdAndRemove(id);
}