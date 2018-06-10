const mongoose = require('../libs/mongoose');
const Article = require('../models/Article');

module.exports = {

    // выборка всех статей из БД, термин которых начинается на определенную букву.
    findArticlesByLetter: async function (ctx) {

        // регулярное выражени - найти слова начинающихся на заданную букву        
        const reg= new RegExp("^" + ctx.params.letter + "\\W", "i");
        
        const art = await Article.find({name: reg}).sort({name: 1});
        if(!art){
            ctx.throw(404, 'art не найден');
        }
        /*вернуть статьи на букву */
        return art;        
    },
    //выборка статей для стартовой станицы
    findDataStart: async function (ctx) {

        //выбрать статьи с именами из массива nameMas. И взять только поля _id и name.
        const nameMas = [
            "абсорбция",
            "ОМОНИМЫ",
            "ПАРАФИНИРОВАНИЕ",
            "ФЛОРА",
            "ПРЕОБРАЖЕНИЕ", 
            "СЛАВУТА",
            "АВАКЯН Борис Петрович",
            "СКУРИХИН Игорь Михайлович",
            "НЕГРУЛЬ Александр Михайлович",
            "барры",
            "ВЕГЕТАЦИЯ"
        ];
        const art = await Article.find({name:{ $in : nameMas}}, {name: 1, description: 1});
        if(!art){
            ctx.throw(404, 'art не найден');
        }

        return art;  
    },
    //найти статью по id
    findArticlesByID: async function(ctx){

        if(!mongoose.Types.ObjectId.isValid(ctx.params.id)){
            ctx.throw(404, 'Не правильно указанно id');
        } 
        const art = await Article.findById(ctx.params.id);        

        if(!art){
            ctx.throw(404, 'art не найден');
        }
        
        /*вернуть статьи по тэгу */
        return art;  
    },
    //найти стать по тексту введенным пользователем
    findArticlesByText: async function(ctx){
        /* создается регулярное выражение, на основе введенным пользователем текстом,
        и по этому регулярному выражению осуществляется поиск в БД  */
        const reg= new RegExp(ctx.params.text, "i");
        
        const art = await Article.find({name: reg}).sort({name: 1});

        if(!art){
            ctx.throw(404, 'art не найден');
        }        
        
        /*вернуть статьи */
        return art;  
    }
}