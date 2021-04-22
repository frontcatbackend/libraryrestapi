//импорт модуля sequelize и деструктуризация класса {Sequelize}
const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    //передаём переменные в конструктор

    process.env.DB_NAME, // Название БД
    process.env.DB_USER, // Пользователь
    process.env.DB_PASSWORD, // ПАРОЛЬ

    //передаём переменные в конструктор
    {
        dialect: 'postgres', //диалект бд
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    

}
) //экспорт объекта класса Sequelize (конструктор в котором указываем конфигурацию bd)