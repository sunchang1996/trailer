const { resolve } = require('path');

const cp = require('child_process'); // 派出一个子进程

const mongoose = require('mongoose');
const Movie = mongoose.model('Movie')

;(async () => {
  // 拿到爬虫脚本
  const script = resolve(__dirname, '../crawler/trailer-list.js')
  // 回返回一个子进程对象
  const child = cp.fork(script, [])
  let invoked = false

  // 注册监听函数
  // 监听异常函数
  child.on('error', err => {
    if (invoked) return

    invoked = true
    console.log(err)
  })

  // 进程退出函数
  child.on('exit', code => {
    if (invoked) return
    invoked = true

    let err = code === 0 ? null : new Error('exit code' + code)

    console.log(err)
  })

  // 拿到send 过来的 数据
  child.on('message', data => {
    let result = data.result
    result.forEach( async item => {
      // 查询数据库里面有没有存过这个数据
      let movie = await Movie.findOne({
        doubanId: item.doubanId
      })
      
      // 如果没有 存储一下
      if (!movie) {
        movie = new Movie(item)
        await movie.save();
      }
    })
    // console.log('结果-----------------------', result)
  })
})()