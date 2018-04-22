const Router = require('koa-router');
const mongoose = require('mongoose');
const router = new Router();

// 获取所有的电影列表
router.get('/movies/all', async (ctx, next) => {
  const Movie = mongoose.model('Movie');
  const movies = await Movie.find({}).sort({
    'meta.createdAt': -1
  })
  ctx.body= {
    movies
  }
})

// 获取单个电影
router.get('/movies/detail/:id', async(ctx, next) => {
  const Movie = mongoose.model('Movie');
  const id = ctx.params.id;
  const movie = await Movie.findOne({_id: id });

  ctx.body = {
    movie
  }
}) 

module.exports = router;