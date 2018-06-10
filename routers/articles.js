

module.exports = {

    /* вернуть все статьи термин которых начинается на определенную букву */
    get_articlesByLetter: async function(ctx, next){
        const articlesData = require('../getData/getArticles');
        ctx.body = await articlesData.get_ArticlesByLetter(ctx); 
    },
    /* вернуть статью по id */
    get_articlesByID: async function(ctx, next){
        const articlesData = require('../getData/getArticles');
        ctx.body = await articlesData.get_ArticleByID(ctx);         
    },
    /* найти стать по тексту введенным пользователем */
    find: async function(ctx, next){
        const articlesData = require('../getData/getArticles');
        
        ctx.body = await articlesData.get_ArticlesByText(ctx); 
    }
}