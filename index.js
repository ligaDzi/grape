const Koa = require('koa');
const app = new Koa();

const config = require('./config/default');

const path = require('path');
const fs = require('fs');

// Здесь подключаються модули из папки handlers.
const handlers = fs.readdirSync(path.join(__dirname, 'handlers')).sort();

handlers.forEach(handler => require('./handlers/' + handler).init(app));

const Router = require('koa-router');

const router = new Router();

router.get('/', require('./routers/frontPage').get);
router.get('/dataStart', require('./routers/frontPage').get_data);
router.get('/tag/:id', require('./routers/tags').get_articlesByTag);
router.get('/articl/:id', require('./routers/articles').get_articlesByID);
router.get('/articles/:letter', require('./routers/articles').get_articlesByLetter);
router.get('/find/:text', require('./routers/articles').find);

app.use(router.routes());

app.listen(config.port);
