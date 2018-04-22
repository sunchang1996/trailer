// const Router = require('koa-router');
const mongoose = require('mongoose');
const router = new Router();

const { controller, get, path} = require('../lib/decorator')
// const router = new Router({
//   prefix: '/movies' // 加router的公用前缀
// });

// 声明名一个装饰器
@controller('/api/v0/movies')
export class movieController{
  get('/')
  // @login 可以添加其他的装饰器
  // @log
  // @required({body: })
  async getMovies (ctx, next) => {
    const Movie = mongoose.model('Movie');
    const movies = await Movie.find({}).sort({
      'meta.createdAt': -1
    })
    ctx.body= {
      movies
    }
  }
  @get('/:id')
  async getMoviesDetail(ctx,next) {
    const Movie = mongoose.model('Movie');
    const id = ctx.params.id;
    const movie = await Movie.findOne({_id: id });

    ctx.body = {
      movie
    }
  }
}






// // 获取所有的电影列表
// router.get('/movies/all', async (ctx, next) => {
//   const Movie = mongoose.model('Movie');
//   const movies = await Movie.find({}).sort({
//     'meta.createdAt': -1
//   })
//   ctx.body= {
//     movies
//   }
// })

// // 获取单个电影
// router.get('/movies/detail/:id', async(ctx, next) => {
//   const Movie = mongoose.model('Movie');
//   const id = ctx.params.id;
//   const movie = await Movie.findOne({_id: id });

//   ctx.body = {
//     movie
//   }
// }) 

module.exports = router;