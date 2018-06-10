
module.exports = {

    //обработка данных из БД для стартовой страницы
    conversion: function (tagsDB, articlDB) {

        let data_mas = {
            tags: [],
            term: [],
            sort: [],
            person: [],
            articl: []
        };

        /* ТЭГИ */
        for(let i in tagsDB){
            data_mas.tags[i] = {};
            
            data_mas.tags[i].id = tagsDB[i]._id;
            data_mas.tags[i].name = tagsDB[i].name;
        }
        
        for(let i in articlDB){
            switch (articlDB[i].name) {
                /* ТЕРМИНЫ */
                case "абсорбция":
                    data_mas.term.push(createArt(articlDB[i]));                    
                    data_mas.articl.push(createArt(articlDB[i]));
                    break; 
                case "ОМОНИМЫ":
                case "ПАРАФИНИРОВАНИЕ": 
                    data_mas.term.push(createArt(articlDB[i]));                    
                    break;  
                /* СОРТА */              
                case "ФЛОРА":
                case "ПРЕОБРАЖЕНИЕ":
                case "СЛАВУТА": 
                    data_mas.sort.push(createArt(articlDB[i]));                    
                    break;
                /* ЛИЧНОСТИ */                
                case "АВАКЯН Борис Петрович":
                case "СКУРИХИН Игорь Михайлович":
                case "НЕГРУЛЬ Александр Михайлович": 
                    data_mas.person.push(createArt(articlDB[i]));                    
                    break; 
                /* СЛУЧАЙНАЯ СТАТЬЯ */      
                case "барры":
                case "ВЕГЕТАЦИЯ": 
                    data_mas.articl.push(createArt(articlDB[i]));                    
                    break;               
            
                default:
                    break;
            }
        }               

        /* метод создает объект статьи */
        function createArt(artDB) {
            let art = {};                
            art.id = artDB._id;
            art.name = artDB.name;
            art.description = artDB.description;
            return art;
        }

        return data_mas;        
    }
}