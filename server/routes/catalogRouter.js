const Router = require('express')
const router = new Router()
const AuthorController = require('../controllers/AuthorController')
const BookController = require('../controllers/BookController')

//author
router.get('/authorlist', AuthorController.getAll)
router.get('/author/:id', AuthorController.getOne)

//book
router.get('/booklist', BookController.getAll )
router.get('/book/:id', BookController.getOne )


module.exports = router