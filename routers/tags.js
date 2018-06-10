const mongoose = require('../libs/mongoose');
const Article = require('../models/Article');
const Tag = require('../models/Tag');

module.exports = {

    //возвращает тэги из БД и данных для стартовой страницы
    get_tags: async function (ctx, next) {
        // (async () => {

        //     let tag = await Tag.findOne({
        //       name: 'термин'
        //     }).populate('articles');
          
        //     console.log(tag);
          
        // })().catch(console.error).then(() => mongoose.disconnect());

        // const tag = await Tag.findById("5b0fed04a33a2839fca77388");
        // console.log(tag);

        // await Tag.create({
        //     name: "вино"
        // });

        // await Article.create({
        //     name: "НЕГРУЛЬ Александр Михайлович ",
        //     description: "(25.12.1900, г. Полтава, — 25.7.1971, г. Москва), сов. ученый в области генетики и селекции винограда. Д-р с.-х. наук 1938), проф. (1940), лауреат Гос. премии СССР (1948), засл. деятель науки РСФСР (1965). Окончил (1925) Одесский с.-х. ин-т. В 1926—44 зав. отделами селекции в-да Одесской винодельческой станции, Научно-исслед. ин-та в-дарства и в-делия (г. Тбили­си), Всесоюзного ин-та растениеводства (г. Ленинград). С 1944 зав. кафедрой в-дарства, в-делия и субтропических культур Московской сельскохозяй­ственной академии им. К.А.Тимирязева.",
        //     html: "<p>TEST</p>",
        //     tag : "5b1007d8b651fb369058492c"
        // });      
    },

    /*вернуть все статьи по тэгу */
    get_articlesByTag: async function(ctx, next){
        const tagsData = require('../getData/getArticles');
        ctx.body = await tagsData.get_ArticlesByTag(ctx); 
    }
}