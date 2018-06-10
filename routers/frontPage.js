
module.exports = {
    
    //возвращает стартовую страницу
    get: async function (ctx, next) {
        ctx.redirect('index.html')        
    },
    //вернуть данные для стартовой страницы
    get_data: async function (ctx, next) {
        const data = require('../getData/getStart');
        ctx.body = await data.get_data(ctx);   
    }
}