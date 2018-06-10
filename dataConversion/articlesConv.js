
module.exports = {

    //обработка данных из БД
    conversion: function (articlesDB) {

        let articles_mas = [];

        //если articlesDB массив
        if(articlesDB.length !== undefined){
            
            for(let i in articlesDB){
                articles_mas[i] = {};
                articles_mas[i].id = articlesDB[i]._id;
                articles_mas[i].name = articlesDB[i].name;
                articles_mas[i].description = articlesDB[i].description;
                articles_mas[i].html = articlesDB[i].html;
            }
        }
        //если articlesDB не массив
        else{            
            articles_mas = {};
            articles_mas.id = articlesDB._id;
            articles_mas.name = articlesDB.name;
            articles_mas.description = articlesDB.description;
            articles_mas.html = articlesDB.html;
        }


        return articles_mas;        
    }
}