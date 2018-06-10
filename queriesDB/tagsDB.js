const mongoose = require('../libs/mongoose');
const Tag = require('../models/Tag');

module.exports = {

    // выборка всех тэгов из БД.
    findAll: async function (ctx) {

        /*найти все тэги, но взять только поля _id и name ({name: 1})*/
        const tags = await Tag.find({}, {name: 1}).sort({name: 1});       

        if(!tags){
            ctx.throw(404, 'tags не найден');
        }
        return tags;        
    },
    // выборка всех статей по тэгу из БД.
    findArticlesByTag: async function (ctx) {

        if(!mongoose.Types.ObjectId.isValid(ctx.params.id)){
            ctx.throw(404, 'Не правильно указанно id');
        } 
        const tag = await Tag.findById(ctx.params.id).populate('articles');

        if(!tag){
            ctx.throw(404, 'tag.articles не найден');
        }
        /*вернуть статьи по тэгу */
        return tag.articles;        
    }
}