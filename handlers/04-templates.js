// no templates in ctx example
const render  = require('koa-ejs');
const path = require('path');

exports.init = app => app.use(async (ctx, next) => {
 
  console.log("Вощел");
  render(app, {
    root: path.join(__dirname, '../templates'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: true
  });
  

  await next();
});
