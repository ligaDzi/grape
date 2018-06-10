//Инициализация бумеранг слайдера 
function initBoomSld(){
    var Lslide      = $('.left-item'),
        Rslide      = $('.right-item'),
        slideHeight = 500,
        index       = 0;
    
    function slideInDOM() {
        let lLength = Lslide.length;
        for (var x = 0; x < lLength; x++) {
            Lslide[x] = $(Lslide[x]);        
        }
        let rLength = Rslide.length;
        for (var y = 0; y < rLength; y++) {        
            Rslide[y] = $(Rslide[y]);        
        }
    }
    
    function moveToTop() {
        index++;
        slideInDOM();
        let lLength = Lslide.length;
        for (var el = 0; el < lLength; el++) {
            var lTop = parseInt(Lslide[el].css("top")) + slideHeight + "px";
            var rTop = parseInt(Rslide[el].css("top")) - slideHeight + "px";
            Lslide[el].css("top", lTop);
            Rslide[el].css("top", rTop);
        }    
    
        if (index > lLength-1) {
            index = 0;
            for (var el = 0; el < lLength; el++) {
                var lTop = -slideHeight * el + "px";
                var rTop = slideHeight * el + "px";
                Lslide[el].css("top", lTop);
                Rslide[el].css("top", rTop);
            }
        }
    }
    
    function moveToBottom() {
        index--;
        slideInDOM();
        let lLength = Lslide.length;
        let rLength = Rslide.length;
        for (var el = 0; el < lLength; el++) {
            var lTop = parseInt(Lslide[el].css("top")) - slideHeight + "px";
            var rTop = parseInt(Rslide[el].css("top")) + slideHeight + "px";
            Lslide[el].css("top", lTop);
            Rslide[el].css("top", rTop);    
        }
    
        if (index < 0) {
            index = Rslide.length-1;
            for (var el = 0; el < lLength; el++) {
                var lTop = parseInt(Lslide[el].css("top")) + slideHeight * (lLength - 1) + "px";
                var rTop = parseInt(Rslide[el].css("top")) - slideHeight * (rLength - 1) + "px";
                Lslide[el].css("top", lTop);
                Rslide[el].css("top", rTop);
            }
        }
    }
    
    $('.control-top').on('click', function(){
        moveToTop();
    });
    $('.control-bottom').on('click', function(){
        moveToBottom();
    });
}

// Модель
class Model{
    constructor(){       
    }
    //Тэги
    get tags(){
        return this._tags;
    }
    set tags(data){
        this._tags = new Array();
        for (let i in data) {
            this._tags[i] = new Tag(data[i].id, data[i].name);
        }        
    }

    //Константа алфавит
    get abc(){
        return ["А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "З", "И", "Й", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х","Ц", "Ч", "Ш", "Щ", "Э", "Ю", "Я"];
    }

    //Активация слайдера
    static actSliders(){
        //Таймаут необходим, т.к. js-код быстрее загружается чем html-страница 
        //js-код не находит ".sorts-items" и слайдер перестает работать. 
        setTimeout(function(){
            $(".sorts-items").flickity({
                prevNextButtons:false,
                cellAlign:"left",
                wrapAround:true
            });            
            initBoomSld();
        }, 100);
    }

    //деактивировать меню
    static deactMenu(){
        if($('.header-menu').hasClass("active"))
            menuAct();
    }

    //добавляет html-код статьи на страницу 
    static addArtHTML(html){
        $('.article-html').append(html);        
    }

    //взять значени введенное в инпут поиска 
    static find(){
        return $('.header-form__input').val();        
    }

    // 
    static showStartPage(){
        $('.start').show();        
    }

    // 
    static hideStartPage(){
        $('.start').hide();        
    }
}

//класс для тэгов
class Tag{
    constructor(id, name){
        this._id = id;
        this._name = name;
    }
    get id(){return this._id}
    set id(value){this._id = value}

    get name(){return this._name}
    set name(value){this._name = value}
}

angular.module("grapeApp", [])
    .controller("grapeCtrl", function($scope, $http, $log, $location, $anchorScroll, $timeout){

        var model = new Model();

        //Функция инициализации стартовой страницы
        function initStartPage() { 
            
            $scope.url = "";
            $timeout(function(){
                Model.actSliders();
            }, 10);            
            //Запрос на сервер за тэгами для меню            
            getTags();
            
            $scope.abc = model.abc;
        }
        $scope.startPage = function(){
            Model.showStartPage();
            initStartPage();

            /* обновить страницу (деактивировать меню, поднять страницу вверх) */
            updatePage();            
        }

        initStartPage();

        /*Обработчик нажатия пункта меню тэга*/
        $scope.tagClick = function(name, id){  
            Model.hideStartPage();
            $scope.url = "tag.html";
            getArticlesByTag(name, id);

            /* обновить страницу (деактивировать меню, поднять страницу вверх) */
            updatePage(); 
        }
        /*Обработчик нажатия пункта меню буквы*/
        $scope.letterClick = function(letter){ 
            Model.hideStartPage();
            $scope.url = "letter.html";
            get_ArticlesByLetter(letter);

            /* обновить страницу (деактивировать меню, поднять страницу вверх) */
            updatePage(); 
        }
        /*Обработчик нажатия на статью*/
        $scope.articleClick = function(name, id){ 
            Model.hideStartPage();
            $scope.url = "article.html";

            //здесь нужна небольшая задержка, чтобы успела загрузиться html-страница,
            //иначе код вставляющий информацию не найдет элементы в которые надо эту информацию вставить.
            $timeout(function(){
                getArticlesByID(name, id);
            }, 10);

            /* обновить страницу (деактивировать меню, поднять страницу вверх) */
            updatePage(); 
        }
        /*Обработка нажатия на кнопку "Поиск" */
        $scope.find = function(){
            let text = Model.find();
            
            if(text !== ""){  
                Model.hideStartPage();                               
                $scope.url = "tag.html";
                $scope.tagAct = text + ":";
                findText(text);                              
            }
        }


        /* ЗАПРОСЫ НА СЕРВЕР: */

        //взять все тэги
        function getTags() {
            $http.get('/dataStart').then(
                function(res){
                    model.tags = res.data.tags;
                    $scope.tagsMenu = model.tags;                    
                    filHeaders(model.tags);

                    $scope.termStart = res.data.term;
                    $scope.sortStart = res.data.sort;
                    $scope.personStart = res.data.person;
                    $scope.articlStart = res.data.articl;
                }, 
                function(err){
                    $log.log(err);
                }
            );
        }
        //взять все статьи по тэгу      
        function getArticlesByTag(name, id) {
            $http.get('/tag/' + id).then(
                function(res){
                   $scope.tagAct = name;
                   $scope.articlesByTag = res.data;
                }, 
                function(err){
                    $log.log(err);
                }
            );
        } 
        //взять статью по id      
        function getArticlesByID(name, id) {
            $http.get('/articl/' + id).then(
                function(res){
                    $scope.artLetter = name[0].toUpperCase();
                    $scope.artName = res.data.name;
                    $scope.artDesc = res.data.description;
                    Model.addArtHTML(res.data.html);
                }, 
                function(err){
                    $log.log(err);
                }
            );
        } 
        //взять все статьия термины которых начинаються на определенную букву
        function get_ArticlesByLetter(letter) {
            $http.get('/articles/' + letter).then(
                function(res){
                    $scope.letterAct = letter;
                    $scope.articlesByTag = res.data;
                }, 
                function(err){
                    $log.log(err);
                }
            );
        }
        //найти в БД на сервере
        function findText(text) {
            $http.get('/find/' + text).then(
                function(res){
                    if(res.data.length > 0){
                        $scope.articlesByTag = res.data;
                    }
                    else{
                        $scope.tagAct += " ничего не найдено";
                    }  
                                    
                }, 
                function(err){
                    $log.log(err);
                }
            );
        }
        
        //метод заполняет заголовки на стартовой странице
        function filHeaders(tags) {
            for (let i in tags) {
                switch (tags[i].name) {
                    case "термины":
                        $scope.termin = tags[i];
                        break;
                    case "сорта":
                        $scope.grades = tags[i];
                        break;
                    case "личности":
                        $scope.personality = tags[i];
                        break;
                }
            }
        } 

        /* обновить страницу (деактивировать меню, поднять страницу вверх) */
        function updatePage() {
            /* деактивировать меню */
            Model.deactMenu();
            /* перместиться вверх страницы */
            anchorUP("siteHeader");
        }
        
        //За счет этой функции реализуется якорная система в AngularJS.
        //В данном случае страница поднимается вверх к header страницы с id="siteHeader".
        function anchorUP(upId) {
            $location.hash(upId);
            $anchorScroll();
        }
        
    })




