const {Book} = require('../models/models')
const ApiError = require('../error/ApiError');
let multer = require('multer')
const upload = require("../middleware/fileUpload");
const fs = require("fs");



class bookController {
    async create(req, res, next) {
        try{
            const {title, summary, authorId}  = req.body
            const book = await Book.create({ title, summary, authorId})
            return res.json(book)
        } catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const books = await Book.findAndCountAll()
        return res.json(books)
    }

    async getOne(req, res){

        const {id} = req.params
        const book = await Book.findOne(
            {
                where: {id},  
            },
        )
        return res.json(book)
    }

    async delete(req, res){
        const {id} = req.params
        await Book.destroy(
            {
                where: {id}, //условие по которому нужно удалить девайс
                
            },
            
        )
        return res.json("book has been deleted")
    }

    async update(req, res, next){
       try{
        const {id} = req.params
        const{title, summary} = req.body
        await Book.update(
            {
             title, summary
            },

            {
                where: {id:id}
            },
            
        )
        let updatedbook = await Book.findByPk(id) //Прлучает(или делает) запись по текущему Id
        return res.json(updatedbook)
       }catch(e){
        next(ApiError.badRequest(e.message))
       }
    }



}

module.exports = new bookController()
