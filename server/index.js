const Koa = require('koa');
const app = new Koa();
const { resolve } = require('path')
const views = require('koa-views');
const { connect, initSchemas, initAdmin } = require('./database/init')
const mongoose  = require('mongoose');


;(async () => {
  await connect()
  initSchemas()
  initAdmin();
  // model 传两个参数 第二个为定义的文件 作为model的发布， 如果只有一个参数
  // const Movie = mongoose.model('Movie')  
   
  // const movies = await Movie.find({})
  // require 执行movie.js
  // require('./tasks/trailer')
  // require('./tasks/movie')
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
