const Koa = require('koa');
const app = new Koa();
const { resolve } = require('path');
const serve = require('koa-static');// 已经静态文件

app.use(serve(resolve(__dirname, './')))

app.listen(4455);
