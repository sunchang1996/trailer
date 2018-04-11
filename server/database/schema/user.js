const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const Mixed = Schema.Types.Mixed;

const SALT_WORK_FACTOR = 10;
const MAX_LOGIN_ATTEMPTS = 5; // 最大登录次数
const LOCK_TIME = 2 * 60 * 60 * 1000;

const UserSchema = new Schema({
  username: {
    unique: true, // 设置唯一的  不能重复
    type: String,
  },

  email: {
    unique: true,
    type: String,
  },

  password: {
    unique: true,
    type: String,
  },

  login : {
    type: Number,
    required: true,  // 不能为空
    default: 0,
  },

  lockUntil: Number,

  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    } 
  }
})

// 添加一个虚拟字段 不保存在数据库中
UserSchema.virtual('isLocked').get(function (){
    return !!(this.lockUntil && this.lockUntil > Date.now())
  }
)

UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updatedAt = Date.now();
  } else {
    this.meta.updatedAt = Date.now();
  }

  next();
}); // pre 在保存之前

// 对密码进行加密
UserSchema.pre('save', function (next) {
  if (User.isModified('password')) return next()

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error)

      this.password = hash
      next();
    })
  })

  next();
}); 

// 对密码进行比对
UserSchema.methods = {
  comparePassword:(_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  },
  
  // 判断用户是不是超过了登录的次数
  incLoginAttempts:(user) => {

    return new Promise( function(resolve, reject) {
      if (this.lockUntil && this.lockUntil < Date.now()) {

        this.update({
          $set: {
            loginAttempts: 1,
          },
          $unset: {
            lockUntil: 1
          },
        }, (err) => {
          if (!err) resolve(true)
          else reject(err)
        })
      } else {
        // 加一操作
        let updates = {
          $inc: {
            loginAttempts: 1
          }
        }

        if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked ) {
          updates.$set = {
            lockUntil: Date.now() + LOCK_TIME
          }
        }

        this.update(updates, err => {
          if (!err) resolve(true)
          else reject(err)
        })
      }
    })
  }
}

mongoose.model('User', UserSchema) // 传递两个参数 
