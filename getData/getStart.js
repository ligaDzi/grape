const tags = require('../queriesDB/tagsDB');
const start_Conv = require('../dataConversion/dataStartConv');
const articles = require('../queriesDB/articlesDB');

module.exports = {

    //выборка всех тэгов из БД
    get_data: async function (ctx) {

        const tagsDB = await tags.findAll(ctx);
        const articlDB = await articles.findDataStart(ctx);

        return start_Conv.conversion(tagsDB, articlDB);        
    }
}