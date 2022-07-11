const config = require('../config.json');
const db = require('../_helpers/db');
const User = db.User;
const Books = db.Books;

module.exports = {
    getAllBooks,
    getById,
    createBook,
    getBookByAuthor,
    update,
    delete: _delete
};


async function getAllBooks(data) {

    let startfrom = data.startfrom ?? 0;
    let displayRecords = data.displayRecords ?? 10;

    return await Books.find().populate("created_by", "firstName lastName").skip((startfrom)).limit(displayRecords);

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
    return await book.save();


}

async function getBookByAuthor(data) {

    return await Books.find(data);
}
async function update(id, data) {
    const book = await Books.findById(id);

    // validate
    if (!book) throw 'Book not found';
    if (book.book_name !== data.book_name && await Books.findOne({ book_name: data.book_name })) {
        return 'BookName "' + data.book_name + '" is already taken';
    }
    // copy data properties to book
    Object.assign(book, data);

    return book.save();
}

async function _delete(id) {
    return await Books.findByIdAndRemove(id);
}