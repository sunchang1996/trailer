const Koa = require('koa');
const app = new Koa();
// const { htmlTpl, ejsTpl, pugTpl } = require('./tpl')
// const ejs = require('ejs')
// const pug = require('pug')

const views = require('koa-views')
const { resolve } = require('path')

app.use(views(resolve(__dirname, './views'), {
  extension: 'pug' // 识别扩展名是pug的文件
}))
app.use(async (ctx, next) => {
  await ctx.render('index', {
    you: 'koa',
    me: 'word'
  })
})

app.listen(5566);
