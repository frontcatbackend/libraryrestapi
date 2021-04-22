const sequelize = require('../db')
const {DataTypes} = require('sequelize') //для описания типов данных

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "ADMIN"},
})

const Author = sequelize.define('author', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    first_name:{type:DataTypes.STRING, unique:false},
    second_name:{type:DataTypes.STRING, unique:false},
    family_name:{type:DataTypes.STRING, unique:false},
    university:{type:DataTypes.STRING, unique:false},
    e_mail:{type: DataTypes.STRING, unique: false},
})

const Book = sequelize.define('book', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // author:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false},
    title:{type:DataTypes.STRING, unique:false},
    summary:{type:DataTypes.STRING, unique:false},
    // file:{type:DataTypes.BLOB},
})

const File = sequelize.define('file',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    file:{type:DataTypes.BLOB('long')}
})



Author.hasMany(Book, { onDelete: "cascade", hooks: true }) // onDelete: "cascade" удаляет все книги связанные с автором
Book.belongsTo(Author)
// Book.hasOne(File)
// File.hasOne(Book)

module.exports = {
    Book,
    Author,
    User,
    File
}
