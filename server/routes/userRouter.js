const Router = require('express')
const router = new Router()
const UserController = require('../controllers/UserController')
const AuthorController = require('../controllers/AuthorController')
const BookController = require('../controllers/BookController')
const authMiddleware = require('../middleware/authMiddleware')
const FileController = require('../controllers/FileController')
// const upload = require("../middleware/fileUpload");


//user
router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.get('/auth', UserController.check)

//author
router.get('/authorlist',authMiddleware, AuthorController.getAll)
router.get('/author/:id',authMiddleware, AuthorController.getOne)
router.post('/createauthor',authMiddleware, AuthorController.create)
router.put('/author/:id',authMiddleware, AuthorController.update)
router.post('/author/:id', authMiddleware, AuthorController.delete)

//book
router.get('/booklist',authMiddleware, BookController.getAll )
router.get('/book/:id',authMiddleware, BookController.getOne )
router.post('/createbook', authMiddleware, BookController.create)
router.put('/book/:id',authMiddleware, BookController.update)
router.post('/book/:id',authMiddleware, BookController.delete)

//file
router.post("/upload", FileController.uploadFile)
router.get("/files", FileController.getFilesList)
router.get("/files/:name", FileController.downloadFiles)


module.exports = router