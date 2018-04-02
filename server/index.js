const Koa = require('koa');
const app = new Koa();
const { resolve } = require('path')
const views = require('koa-views');
const { connect } = require('./database/init')


;(async () => {
  await connect()
})()

// const { htmlTpl, ejsTpl, pugTpl } = require('./tpl')
// const ejs = require('ejs')
// const pug = require('pug')

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
