const {Author, Book} = require('../models/models')
const ApiError = require('../error/ApiError');

class AuthorController {
    async create(req, res, next) {
        try{
               const {first_name, second_name, family_name, university,  e_mail} = req.body
               const author = await Author.create({first_name, second_name, family_name, university,
               e_mail})
               return res.json(author)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
              
    }

    async getAll(req, res) {
        const authors = await Author.findAndCountAll()
        return res.json(authors)
    }

    async getOne(req, res){
        const {id} = req.params
        const author = await Author.findOne(
            {
                where: {id},  
            },
        )
        return res.json(author)    
    }

    async delete(req, res, next){
        const {id} = req.params
        await Author.destroy(
            {
                where: {id}, //условие по которому нужно удалить девайс
                
            },
            
        )
        return res.json("author has been deleted")
    }

    async update(req, res, next){
        try{
         const {id} = req.params
         const{first_name, second_name, family_name, university,  e_mail} = req.body
         await Author.update(
             {
                first_name, second_name, 
                family_name, university,
                e_mail
             },
 
             {
                 where: {id:id}
             },
             
         )
         let updatedauthor = await Author.findByPk(id) //Прлучает(или делает) запись по текущему Id
         return res.json(updatedauthor)
        }catch(e){
         next(ApiError.badRequest(e.message))
        }
     }

}



module.exports = new AuthorController()
