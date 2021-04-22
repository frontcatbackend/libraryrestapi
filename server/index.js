const express = require('express')
require('dotenv').config()
const sequelize = require('./db')
const PORT = process.env.PORT || 5000
const cors = require('cors')
const router = require('./routes/index')

const app = express()
app.use(cors()) // Для направления запросов
app.use(express.json())
app.use('/api', router)


// app.get('/', (req,res)=>{
//     res.status(200).json({message:'HELLO'})
// })

//вызываем функцию для подключения к дб
const start = async () => { //все операции с дб - асинхронные
    try {  // отлавливаем ошибки 
        await sequelize.authenticate()  // устанавливается подключение к бд
        await sequelize.sync().then(() => {
            console.log("DB created")
        }) // сверяет состояние бд со схемой бд
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start() // запуск сервера