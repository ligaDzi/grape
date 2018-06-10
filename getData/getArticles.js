const tags = require('../queriesDB/tagsDB');
const articles = require('../queriesDB/articlesDB');
const articles_Conv = require('../dataConversion/articlesConv');

module.exports = {
    //выборка всех статей по тэгу
    get_ArticlesByTag: async function(ctx){
        
        const articlesDB = await tags.findArticlesByTag(ctx);

        return articles_Conv.conversion(articlesDB);
    },
    //выборка всех статей по Букве
    get_ArticlesByLetter: async function(ctx){
    
        const articlesDB = await articles.findArticlesByLetter(ctx);

        return articles_Conv.conversion(articlesDB);
    },
    //выборка статьи по id
    get_ArticleByID: async function(ctx){
    
        const articlesDB = await articles.findArticlesByID(ctx);

        return articles_Conv.conversion(articlesDB);
    },
    //найти стать по тексту введенным пользователем
    get_ArticlesByText: async function(ctx){
    
        const articlesDB = await articles.findArticlesByText(ctx);

        return articles_Conv.conversion(articlesDB);
    }
}