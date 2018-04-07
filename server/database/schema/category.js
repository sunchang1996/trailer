const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const CategorySchema = new Schema({
  name: {
    unique: true,
    type: String,
  },
  movies: [{
    type: ObjectId,
    ref: 'Movie'   //建立一个指向关系
  }],
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

CategorySchema.pre('save', next => {
  if (this.isNew) {
    this.meta.createAt = this.meta.updatedAt = Date.now();
  } else {
    this.meta.updatedAt = Date.now();
  }

  next();
}); // pre 在保存之前

mongoose.model('Category', CategorySchema) // 传递两个参数 