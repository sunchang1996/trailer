const mongoose = require('mongoose')
const db = 'mongodb://localhost/trailer'
const { resolve } = require('path')
// const User = require('User')
const glob = require('glob') // node 模块 加载所有文件用
mongoose.Promise = global.Promise

// 加载Schema 下面所有的JS文件
exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}

// 项目启动时 插入一条管理员账户
exports.initAdmin = async () => {
  const User = mongoose.model('User')
  let user = await User.findOne({
    username: 'achang'
  })

  if (!user) {
    const user = new User({
      username: 'achang',
      email: 'koa2@imooc.com',
      password: '123abc'
    })
    await user.save();
  }
}

exports.connect = () => {

  const maxConnectTimes = 0;

  return new Promise((resolve, reject) => {
    if(process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
  
    mongoose.connect(db); // 连接数据库
    mongoose.connection.on('disconnected', () => {  //连接中断的时候
      if (maxConnectTimes < 5) {
        mongoose.connect(db);
      } else {  
        throw new Error('数据库挂了')
      }
    })
  
    mongoose.connection.on('error', err => {
      maxConnectTimes ++;
      if (maxConnectTimes < 5) {
        mongoose.connect(db);
      } else {
        throw new Error('数据库挂了')
      }
      console.log(err)
    })
  
    mongoose.connection.once('open', () => {
      const Dog = mongoose.model('Dog', { name: String})
      const doga = new Dog({ name: 'haha'})
      doga.save().then(() => {
        console.log('wang')
      })

      resolve()
      console.log('打开数据库')
    })
  })

}